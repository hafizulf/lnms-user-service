import { Controller, UseInterceptors } from "@nestjs/common";
import { FindUsersResponseDto } from "../dto/find-users.dto";
import { GrpcMethod } from "@nestjs/microservices";
import { UserRpcService } from "src/modules/users/application/services/user-rpc.service";
import { GrpcLoggerInterceptor } from "src/interceptors/logger.interceptor";

@Controller()
@UseInterceptors(GrpcLoggerInterceptor)
export class UsersRpcController {
  constructor(private readonly userService: UserRpcService) {}

  @GrpcMethod('UserService', 'FindUsers') // Must match the service name and method name in the proto
  async findUsers(_: {}): Promise<FindUsersResponseDto> {
    const response = await this.userService.findUsers(_);
    return response;
  }
}
