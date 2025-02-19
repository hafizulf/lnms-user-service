export class ResponseDto<T> {
  constructor(
    readonly code: string,
    readonly message: string,
    readonly data?: T,
  ) {}
}
