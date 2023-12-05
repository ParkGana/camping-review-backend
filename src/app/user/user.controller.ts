import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { SignUpDTO } from 'src/dto/signup.dto';
import { UserModel } from 'src/model/user.model';
import { SignInDTO } from 'src/dto/signin.dto';
import { ConnectionDTO } from 'src/dto/connection.dto';

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

  /* 계정 정보 조회 */
  @ApiOperation({ summary: '계정 정보 조회' })
  @Get('/profile/:email')
  GetProfile(@Param('email') email: string): Promise<UserModel> {
    return this.userService.GetProfile(email);
  }

  /* 계정 연결 신청 */
  @ApiOperation({ summary: '계정 연결 신청' })
  @Post('/connection/request')
  RequestConnection(@Body() dto: ConnectionDTO): Promise<string> {
    return this.userService.RequestConnection(dto);
  }

  /* 계정 연결 수락 */
  @ApiOperation({ summary: '계정 연결 수락' })
  @Post('/connection/response')
  ResponseConnection(@Body() dto: ConnectionDTO): Promise<string> {
    return this.userService.ResponseConnection(dto);
  }
}
