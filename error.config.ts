import { UserException } from 'src/exception/user.exception';
import { ConnectionException } from 'src/exception/connection.exception';

export const generateError = (message: string) => {
  switch (message) {
    // 회원가입
    case 'Firebase: Error (auth/invalid-email).':
      throw new UserException.InvalidEmail();

    case 'Firebase: Error (auth/email-already-in-use).':
      throw new UserException.AlreadyExist();

    // 로그인
    case 'Firebase: Error (auth/invalid-credential).':
      throw new UserException.InvalidCredential();

    // 계정 연결 요청
    case 'Connection : Not Exist':
      throw new ConnectionException.NotExist();

    case 'Connection : Already Connection':
      throw new ConnectionException.AlreadyConnection();

    case 'Connection : Already Send':
      throw new ConnectionException.AlreadySend();

    case 'Connection : Already Receive':
      throw new ConnectionException.AlreadyReceive();

    default:
      throw new Error('잠시 후 다시 시도해 주세요.');
  }
};
