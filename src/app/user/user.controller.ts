import { Controller, Body, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { SignUpDTO } from 'src/dto/signup.dto';
import { UserModel } from 'src/model/user.model';
import { SignInDTO } from 'src/dto/signin.dto';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /* 회원가입 */
  @ApiOperation({ summary: '회원가입' })
  @Post('/signup')
  SignUp(@Body() dto: SignUpDTO): Promise<UserModel> {
    return this.userService.SignUp(dto);
  }

  /* 로그인 */
  @ApiOperation({ summary: '로그인' })
  @Post('/signin')
  SignIn(@Body() dto: SignInDTO): Promise<UserModel> {
    return this.userService.SignIn(dto);
  }
}
