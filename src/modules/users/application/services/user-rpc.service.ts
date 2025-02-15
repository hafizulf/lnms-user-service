import { Inject, Injectable } from '@nestjs/common';
import { FindUsersResponseDto } from '../../interface/grpc/dto/find-users.dto';
import { UserResponseDto } from '../../interface/grpc/dto/user-response.dto';
import { TransformerResponse } from 'src/modules/common/helpers/transformer';
import { REPOSITORY_TYPES } from '../../infrastructure/database/repositories/repository.types';
import { UserRepository } from '../../infrastructure/database/repositories/user.repository';

@Injectable()
export class UserRpcService {
  constructor(
    @Inject(REPOSITORY_TYPES.repositories.UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async findUsers(_: {}): Promise<FindUsersResponseDto> {
    const dataUsers = await this._userRepository.findUsers();
    const transformedDataUsers = dataUsers.map((user) => {
      return TransformerResponse.transform(user, UserResponseDto);
    });

    return {
      users: transformedDataUsers,
    };
  }
}
