import { ApiProperty } from '@nestjs/swagger';

export class CharacteristicCreateDTO {
  @ApiProperty({ default: '' })
  type: string;

  @ApiProperty({ default: '' })
  contents: string;

  @ApiProperty({ default: '' })
  userEmail: string;
}
