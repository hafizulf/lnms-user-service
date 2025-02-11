import { Module } from '@nestjs/common';
import { UserRpcService } from './application/services/user-rpc.service';
import { UsersRpcController } from './interface/grpc/controller/user-rpc.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GrpcLoggerInterceptor } from 'src/interceptors/logger.interceptor';

@Module({
  controllers: [UsersRpcController],
  providers: [
    UserRpcService,
    {
      provide: APP_INTERCEPTOR,
      useClass: GrpcLoggerInterceptor,
    },
  ],
})
export class UserModule {}
