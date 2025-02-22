import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserRequestDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Name is required' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;
}

export class UpdateUserResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at: Date;
}
