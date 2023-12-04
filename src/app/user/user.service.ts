import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignUpDTO } from 'src/dto/signup.dto';
import { UserModel } from 'src/model/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  /* 회원가입 */
  async SignUp(dto: SignUpDTO): Promise<UserModel> {
    return this.userRepository.SignUp(dto);
  }
}
