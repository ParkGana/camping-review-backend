import { HttpException, HttpStatus } from '@nestjs/common';
import { DefaultException } from './default.exception';

enum ConnectionExceptionCode {
  NOT_EXIST = 0,
  ALREADY_CONNECTION = 1,
  ALREADY_SEND = 2,
  ALREADY_RECEIVE = 3,
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ConnectionException {
  const PREFIX = 'CONNECTION' as const;

  export class NotExist extends HttpException {
    constructor() {
      super(
        new DefaultException(
          PREFIX,
          ConnectionExceptionCode.NOT_EXIST,
          '존재하지 않는 이메일입니다.',
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  export class AlreadyConnection extends HttpException {
    constructor() {
      super(
        new DefaultException(
          PREFIX,
          ConnectionExceptionCode.ALREADY_CONNECTION,
          '이미 다른 계정과 연결된 이메일입니다.',
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  export class AlreadySend extends HttpException {
    constructor() {
      super(
        new DefaultException(
          PREFIX,
          ConnectionExceptionCode.ALREADY_SEND,
          '이미 다른 계정에 연결 요청을 한 이메일입니다.',
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  export class AlreadyReceive extends HttpException {
    constructor() {
      super(
        new DefaultException(
          PREFIX,
          ConnectionExceptionCode.ALREADY_RECEIVE,
          '이미 다른 계정으로부터 연결 요청을 받은 이메일입니다.',
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
