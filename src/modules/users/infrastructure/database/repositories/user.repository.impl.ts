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

  async findByEmail(email: string): Promise<User | null> {
    const userEntity = await this.userRepository.findOne({ where: { email } });

    return userEntity ? User.fromEntity(userEntity) : null;
  }

  async createUser(userData: User): Promise<User> {
    const userEntity = userData.toEntity();
    const savedUser = await this.userRepository.save(userEntity);

    return User.fromEntity(savedUser);
  }
}
