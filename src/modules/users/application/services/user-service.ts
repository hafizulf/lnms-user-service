import { ConflictException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserRequestDto, CreateUserResponseDto } from "../../interface/http/dto/create-user.dto";
import { User } from "../../domain/models/user.model";
import { REPOSITORY_TYPES } from "../../infrastructure/database/repositories/repository.types";
import { UserRepository } from "../../infrastructure/database/repositories/user.repository";
import { TransformerResponse } from "src/modules/common/helpers/transformer";
import { ERROR_MESSAGES } from "src/modules/common/constants/error-message.constant";
import { UpdateUserRequestDto, UpdateUserResponseDto } from "../../interface/http/dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOSITORY_TYPES.repositories.UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async createUser(
    userData: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const findUser = await this._userRepository.findByEmail(userData.email);
    if (findUser) {
      throw new ConflictException(ERROR_MESSAGES.USER_ALREADY_EXISTS);
    }

    const user = User.create(userData);
    const savedUser = await this._userRepository.createUser(user);

    return TransformerResponse.transform(savedUser, CreateUserResponseDto);
  }

  async updateUser(
    id: number,
    userData: UpdateUserRequestDto,
  ): Promise<UpdateUserResponseDto> {
    const user = await this._userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    // Check if email is provided and already exists (excluding the current user)
    if (userData.email) {
      const existingUser = await this._userRepository.findByEmail(
        userData.email,
      );
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException(ERROR_MESSAGES.USER_ALREADY_EXISTS);
      }
    }

    user.update(userData);

    const updatedUser = await this._userRepository.updateUser(user);
    return TransformerResponse.transform(updatedUser, UpdateUserResponseDto);
  }
}
