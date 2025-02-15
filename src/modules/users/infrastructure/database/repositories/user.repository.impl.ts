import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserEntity } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/modules/users/domain/models/user.model";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity) readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUsers(): Promise<User[]> {
    const dataUser = await this.userRepository.find();

    return dataUser.map((entity) => User.fromEntity(entity));
  }
}
