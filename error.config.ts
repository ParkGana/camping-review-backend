import { UserException } from 'src/exception/user.exception';

export const generateError = (message: string) => {
  switch (message) {
    // 회원가입
    case 'Firebase: Error (auth/invalid-email).':
      throw new UserException.InvalidEmail();

    case 'Firebase: Error (auth/email-already-in-use).':
      throw new UserException.AlreadyExist();

    default:
      throw new Error('잠시 후 다시 시도해 주세요.');
  }
};
