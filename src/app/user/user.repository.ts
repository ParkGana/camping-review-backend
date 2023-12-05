import { SignUpDTO } from 'src/dto/signup.dto';
import { UserEntity } from 'src/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../../firebase.config';
import { UserModel } from 'src/model/user.model';
import { UserException } from 'src/exception/user.exception';
import { generateError } from 'error.config';
import { SignInDTO } from 'src/dto/signin.dto';

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
}
