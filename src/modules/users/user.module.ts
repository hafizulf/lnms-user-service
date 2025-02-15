import { Module } from '@nestjs/common';
import { UserRpcService } from './application/services/user-rpc.service';
import { UsersRpcController } from './interface/grpc/controller/user-rpc.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GrpcLoggerInterceptor } from 'src/interceptors/logger.interceptor';
import { REPOSITORY_TYPES } from './infrastructure/database/repositories/repository.types';
import { UserRepositoryImpl } from './infrastructure/database/repositories/user.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
    ])
  ],
  controllers: [UsersRpcController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: GrpcLoggerInterceptor,
    },
    {
      provide: REPOSITORY_TYPES.repositories.UserRepository,
      useClass: UserRepositoryImpl,
    },
    UserRpcService,
  ],
})
export class UserModule {}
