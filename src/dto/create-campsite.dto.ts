import { ApiProperty } from '@nestjs/swagger';

export class CreateCampsiteDTO {
  @ApiProperty({ default: '' })
  name: string;

  @ApiProperty({ default: '' })
  address: string;

  @ApiProperty({ default: '' })
  feeling: string;

  @ApiProperty({ default: '' })
  inTime: string;

  @ApiProperty({ default: '' })
  outTime: string;

  @ApiProperty({ default: '' })
  userEmail: string;
}
