export function Ok<T, E>(data: T): Result<T, E> {
  return new Result<T, E>(true, data, undefined);
}

export function Err<T, E>(message: E): Result<T, E> {
  return new Result<T, E>(false, undefined, message);
}

export class Result<T, E> {
  public isOk: boolean;
  private data?: T;
  private error?: E;

  constructor(isOk: boolean, data?: T, error?: E) {
    this.isOk = isOk;
    this.data = data ?? undefined;
    this.error = error ?? undefined;
  }

  expect(errMessage: string) {
    if (this.isOk) return this.data;
    throw new Error(errMessage);
  }

  unwrap() {
    if (this.isOk === true) {
      return this.data;
    } else {
      throw this.error;
    }
  }

  unwrapErr() {
    if (!this.isOk) return this.error;
    throw new Error(`Tried to unwrap an error when there was none!`);
  }
}
