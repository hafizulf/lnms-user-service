import { Injectable } from '@nestjs/common';
import { FindUsersResponseDto } from '../../interface/grpc/dto/find-users.dto';
import { IUser } from '../interfaces/user.interface';
import { UserResponseDto } from '../../interface/grpc/dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserRpcService {
  async findUsers(_: {}): Promise<FindUsersResponseDto> {
    const users: IUser[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      },
    ];

    return {
      users: users.map((user) => this.mapToRpcResponse(user)),
    };
  }

  private mapToRpcResponse(user: IUser): UserResponseDto {
    console.log('Before Transformation:', user);
    const userResponse = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
    console.log('After Transformation:', userResponse);
    return userResponse;
  }
}
