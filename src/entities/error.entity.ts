import { HttpStatus as STATUS } from '@nestjs/common';

export class MyException extends Error {
  httpStatus: number;
  code: number;
  error: string | null;
  additional: object | null;
  constructor(options?: object) {
    super();
    this.additional = options || null;
  }
}

export class RegisterFail extends MyException {
  httpStatus = STATUS.BAD_REQUEST;
  code = 400;
  error = 'REGISTER_FAIL'; // ? should add more detail errors
}

export class UserNotFound extends MyException {
  httpStatus = STATUS.NOT_FOUND;
  code = 404;
  error = 'USER_NOT_FOUND';
}

export class UserAlreadyExist extends MyException {
  httpStatus = STATUS.CONFLICT;
  code = this.httpStatus;
  error = 'USER_ALREADY_EXIST';
}

export class LoginFail extends MyException {
  httpStatus = STATUS.UNAUTHORIZED;
  code = this.httpStatus;
  error = 'LOGIN_FAIL';
}
