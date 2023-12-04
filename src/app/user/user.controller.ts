import { Controller, Body, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { SignUpDTO } from 'src/dto/signup.dto';
import { UserModel } from 'src/model/user.model';

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
}
