import { ApiProperty } from '@nestjs/swagger';

export class CampsiteCreateDTO {
  @ApiProperty({ default: '' })
  name: string;

  @ApiProperty({ default: '' })
  address: string;

  @ApiProperty({ default: '' })
  inTime: string;

  @ApiProperty({ default: '' })
  outTime: string;

  @ApiProperty({ default: '' })
  type: string;

  @ApiProperty({ default: '' })
  feeling: string;

  @ApiProperty({ default: [] })
  characteristicIds: string[];

  @ApiProperty({ default: '' })
  userEmail: string;
}
