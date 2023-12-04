import { ApiProperty } from '@nestjs/swagger';

export class SignUpDTO {
  @ApiProperty({ default: '' })
  email: string;

  @ApiProperty({ default: '' })
  password: string;

  @ApiProperty({ default: '' })
  name: string;
}
