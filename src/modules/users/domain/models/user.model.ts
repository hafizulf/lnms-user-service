import { UserEntity } from "../../infrastructure/database/entities/user.entity";

export class User {
  private _id: number;
  private _name: string;
  private _email: string;
  private _password: string;
  private _is_active: boolean;
  private _created_at: Date;
  private _updated_at: Date;

  constructor(id: number) {
    this._id = id;
  }

  public static fromEntity(entity: UserEntity): User {
    const user = new User(entity.id);

    user._id = entity.id;
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

    entity.id = this._id;
    entity.name = this._name;
    entity.email = this._email;
    entity.password = this._password;
    entity.is_active = this._is_active;
    entity.created_at = this._created_at;
    entity.updated_at = this._updated_at;

    return entity;
  }

  // Getter
  get id(): number {
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

  // Setter
  set id(id: number) {
    this._id = id;
  }

  set name(name: string) {
    this._name = name;
  }

  set email(email: string) {
    this._email = email;
  }

  set password(password: string) {
    this._password = password;
  }

  set is_active(is_active: boolean) {
    this._is_active = is_active;
  }

  set created_at(created_at: Date) {
    this._created_at = created_at;
  }

  set updated_at(updated_at: Date) {
    this._updated_at = updated_at;
  }
}
