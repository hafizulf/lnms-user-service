import { UserEntity } from "../../infrastructure/database/entities/user.entity";
import { CreateUserRequestDto } from "../../interface/http/dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { UpdateUserRequestDto } from "../../interface/http/dto/update-user.dto";

export class User {
  private _id?: number;
  private _name: string;
  private _email: string;
  private _password: string;
  private _is_active: boolean;
  private _created_at: Date;
  private _updated_at: Date;

  constructor(id?: number) {
    this._id = id;
  }

  public static create(userData: CreateUserRequestDto): User {
    const now = new Date();
    const user = new User();

    user._name = userData.name;
    user._email = userData.email;
    user._password = bcrypt.hashSync(userData.password, 10);
    user._is_active = true;
    user._created_at = now;
    user._updated_at = now;

    return user;
  }

  public update(userData: UpdateUserRequestDto): void {
    this.name = userData.name ?? this.name;
    this.email = userData.email ?? this.email;
    this._updated_at = new Date();
  }

  public static fromEntity(entity: UserEntity): User {
    const user = new User(entity.id);

    user._name = entity.name;
    user._email = entity.email;
    user._password = entity.password;
    user._is_active = entity.is_active;
    user._created_at = entity.created_at;
    user._updated_at = entity.updated_at;

    return user;
  }

  public toEntity(): UserEntity {
    const entity = new UserEntity();

    if (this._id !== undefined) {
      entity.id = this._id;
    }
    entity.name = this._name;
    entity.email = this._email;
    entity.password = this._password;
    entity.is_active = this._is_active;
    entity.created_at = this._created_at;
    entity.updated_at = this._updated_at;

    return entity;
  }

  // Getters & Setters
  get id(): number | undefined {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get is_active(): boolean {
    return this._is_active;
  }

  get created_at(): Date {
    return this._created_at;
  }

  get updated_at(): Date {
    return this._updated_at;
  }

  set name(name: string) {
    this._name = name;
  }

  set email(email: string) {
    this._email = email;
  }

  async setPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    this._password = await bcrypt.hash(password, salt);
  }

  set is_active(is_active: boolean) {
    this._is_active = is_active;
  }

  set updated_at(updated_at: Date) {
    this._updated_at = updated_at;
  }
}
