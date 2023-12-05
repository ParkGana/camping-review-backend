import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { SignUpDTO } from 'src/dto/signup.dto';
import { UserModel } from 'src/model/user.model';
import { SignInDTO } from 'src/dto/signin.dto';
import { ConnectionDTO } from 'src/dto/connection.dto';

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

  /* 로그인 */
  async SignIn(dto: SignInDTO): Promise<UserModel> {
    return this.userRepository.SignIn(dto);
  }

  /* 계정 연결 신청 */
  async RequestConnection(dto: ConnectionDTO): Promise<string> {
    return this.userRepository.RequestConnection(dto);
  }

  /* 계정 연결 수락 */
  async ResponseConnection(dto: ConnectionDTO): Promise<string> {
    return this.userRepository.ResponseConnection(dto);
  }
}
