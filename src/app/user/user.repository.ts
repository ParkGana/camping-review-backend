import { SignUpDTO } from 'src/dto/signup.dto';
import { UserEntity } from 'src/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../../../firebase.config';
import { UserModel } from 'src/model/user.model';
import { UserException } from 'src/exception/user.exception';
import { generateError } from 'error.config';
import { SignInDTO } from 'src/dto/signin.dto';
import { ConnectionDTO } from 'src/dto/connection.dto';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  /* 회원가입 */
  async SignUp(dto: SignUpDTO): Promise<UserModel> {
    const { email, password, name } = dto;

    const query = this.createQueryBuilder('user');

    const exist = await query
      .select()
      .where('user.email = :userEmail', { userEmail: email })
      .getCount();

    if (exist) {
      throw new UserException.AlreadyExist();
    } else {
      try {
        await createUserWithEmailAndPassword(auth, email, password);

        const user = (
          await query.insert().values({ email, name }).returning('*').execute()
        ).raw[0] as UserEntity;

        return new UserModel(user);
      } catch (error) {
        generateError(error.message);
      }
    }
  }

  /* 로그인 */
  async SignIn(dto: SignInDTO): Promise<UserModel> {
    const { email, password } = dto;

    const query = this.createQueryBuilder('user');

    try {
      await signInWithEmailAndPassword(auth, email, password);

      const user = await query
        .select()
        .where('user.email = :userEmail', { userEmail: email })
        .getOne();

      return new UserModel(user);
    } catch (error) {
      generateError(error.message);
    }
  }

  /* 로그아웃 */
  async Logout(): Promise<string> {
    try {
      await signOut(auth);

      return '로그아웃 완료';
    } catch (error) {
      generateError(error.message);
    }
  }

  /* 계정 정보 조회 */
  async GetProfile(email: string): Promise<UserModel> {
    const query = this.createQueryBuilder('user');

    try {
      const user = await query
        .select()
        .where('user.email = :userEmail', { userEmail: email })
        .getOne();

      return new UserModel(user);
    } catch (error) {
      generateError(error.message);
    }
  }

  /* 계정 연결 신청 */
  async RequestConnection(dto: ConnectionDTO): Promise<string> {
    const { sender, receiver } = dto;

    const query = this.createQueryBuilder('user');

    try {
      const user = await query
        .select()
        .where('user.email = :userEmail', { userEmail: receiver })
        .getOne();

      // 해당 계정이 존재하지 않을 경우
      if (!user) {
        throw new Error('Connection : Not Exist');
      }
      // 연결이 불가능한 계정일 경우
      else if (new UserModel(user).connectionEmail) {
        const state = new UserModel(user).connectionState;

        if (state === 'C') {
          throw new Error('Connection : Already Connection');
        } else if (state === 'S') {
          throw new Error('Connection : Already Send');
        } else if (state === 'R') {
          throw new Error('Connection : Already Receive');
        }
      }
      // 연결이 가능한 계정일 경우
      else {
        await query
          .update()
          .set({
            connectionEmail: receiver,
            connectionState: 'S',
          })
          .where('email = :userEmail', { userEmail: sender })
          .execute();

        await query
          .update()
          .set({
            connectionEmail: sender,
            connectionState: 'R',
          })
          .where('email = :userEmail', { userEmail: receiver })
          .execute();

        return '연결 신청 완료';
      }
    } catch (error) {
      generateError(error.message);
    }
  }

  /* 계정 연결 수락 */
  async ResponseConnection(dto: ConnectionDTO): Promise<string> {
    const { sender, receiver } = dto;

    const query = this.createQueryBuilder('user');

    try {
      await query
        .update()
        .set({
          connectionState: 'C',
        })
        .where('email IN (:sender, :receiver)', { sender, receiver })
        .execute();

      return '연결 수락 완료';
    } catch (error) {
      generateError(error.message);
    }
  }
}
