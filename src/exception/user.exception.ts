import { HttpException, HttpStatus } from '@nestjs/common';
import { DefaultException } from './default.exception';

enum UserExceptionCode {
  INVALID_EMAIL = 0,
  ALREADY_EXIST = 1,
  INVALID_CREDENTIAL = 2,
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UserException {
  const PREFIX = 'USER' as const;

  export class InvalidEmail extends HttpException {
    constructor() {
      super(
        new DefaultException(
          PREFIX,
          UserExceptionCode.INVALID_EMAIL,
          '이메일 형식이 아닙니다.',
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  export class AlreadyExist extends HttpException {
    constructor() {
      super(
        new DefaultException(
          PREFIX,
          UserExceptionCode.ALREADY_EXIST,
          '이미 사용 중인 이메일입니다.',
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  export class InvalidCredential extends HttpException {
    constructor() {
      super(
        new DefaultException(
          PREFIX,
          UserExceptionCode.INVALID_CREDENTIAL,
          '아이디 또는 비밀번호가 일치하지 않습니다.',
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
