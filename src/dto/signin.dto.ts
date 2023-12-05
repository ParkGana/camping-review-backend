import { ApiProperty } from '@nestjs/swagger';

export class SignInDTO {
  @ApiProperty({ default: '' })
  email: string;

  @ApiProperty({ default: '' })
  password: string;
}
