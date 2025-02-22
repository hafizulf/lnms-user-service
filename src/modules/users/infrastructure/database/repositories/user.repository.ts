import { User } from "src/modules/users/domain/models/user.model";

export interface UserRepository {
  findUsers(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  createUser(userData: User): Promise<User>;
  findById(id: number): Promise<User | null>;
  updateUser(user: User): Promise<User>;
}
