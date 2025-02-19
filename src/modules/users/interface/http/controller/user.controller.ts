import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserRpcService } from "src/modules/users/application/services/user-rpc.service";
import { UserService } from "src/modules/users/application/services/user-service";
import { CreateUserRequestDto, CreateUserResponseDto } from "../dto/create-user.dto";
import { ResponseDto } from "src/modules/common/dto/response.dto";

@Controller()
export class UserController {
  constructor(
    private readonly _userService: UserService,
    private readonly _userRpcService: UserRpcService,
  ) {}

  @Get('/users')
  async findUsers() {
    return await this._userRpcService.findUsers({});
  }

  @Post('/users')
  async createUser(
    @Body() request: CreateUserRequestDto,
  ): Promise<ResponseDto<CreateUserResponseDto>> {
    const data = await this._userService.createUser(request);

    return new ResponseDto<CreateUserResponseDto>('success', 'User created successfully', data);
  }
}
