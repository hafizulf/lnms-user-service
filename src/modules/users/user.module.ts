import { Module } from '@nestjs/common';
import { UserRpcService } from './application/services/user.service';
import { UsersRpcController } from './interface/grpc/controller/user-rpc.controller';

@Module({
  controllers: [UsersRpcController],
  providers: [
    UserRpcService,
  ],
})
export class UserModule {}
