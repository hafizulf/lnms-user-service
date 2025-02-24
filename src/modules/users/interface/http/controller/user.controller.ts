import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseFilters } from "@nestjs/common";
import { UserRpcService } from "src/modules/users/application/services/user-rpc.service";
import { UserService } from "src/modules/users/application/services/user-service";
import { CreateUserRequestDto, CreateUserResponseDto } from "../dto/create-user.dto";
import { ResponseDto } from "src/modules/common/dto/response.dto";
import { UpdateUserRequestDto, UpdateUserResponseDto } from "../dto/update-user.dto";
import { ParseIntExceptionFilter } from "src/modules/common/filters/parse-int-exception.filter";

@Controller()
export class UserController {
  constructor(
    private readonly _userService: UserService,
    private readonly _userRpcService: UserRpcService,
  ) {}

  @Get('/users')
  async findUsers() {
    const response = await this._userRpcService.findUsers({});

    return {
      statusCode: 200,
      message: 'Users retrieved successfully',
      data: response.users, // Transform "users" to "data"
    };
  }

  @Post('/users')
  async createUser(
    @Body() request: CreateUserRequestDto,
  ): Promise<ResponseDto<CreateUserResponseDto>> {
    const data = await this._userService.createUser(request);

    return new ResponseDto<CreateUserResponseDto>(
      201,
      'User created successfully',
      data,
    );
  }

  @Put('/users/:id')
  @UseFilters(new ParseIntExceptionFilter())
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdateUserRequestDto,
  ): Promise<ResponseDto<UpdateUserResponseDto>> {
    const data = await this._userService.updateUser(id, request);

    return new ResponseDto<UpdateUserResponseDto>(
      200,
      'User updated successfully',
      data,
    );
  }

  @Delete('/users/:id')
  @UseFilters(new ParseIntExceptionFilter())
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseDto<void>> {
    const data = await this._userService.deleteUser(id);

    return new ResponseDto<void>(200, 'User deleted successfully');
  }
}
