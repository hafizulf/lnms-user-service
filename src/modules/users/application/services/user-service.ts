import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { CreateUserRequestDto, CreateUserResponseDto } from "../../interface/http/dto/create-user.dto";
import { User } from "../../domain/models/user.model";
import { REPOSITORY_TYPES } from "../../infrastructure/database/repositories/repository.types";
import { UserRepository } from "../../infrastructure/database/repositories/user.repository";
import { TransformerResponse } from "src/modules/common/helpers/transformer";
import { ERROR_MESSAGES } from "src/modules/common/constants/error-message.constant";

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
}
