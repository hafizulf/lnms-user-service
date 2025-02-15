import { User } from "src/modules/users/domain/models/user.model";

export interface UserRepository {
  findUsers(): Promise<User[]>;
}
