import { ApiProperty } from '@nestjs/swagger';

export class CampsiteCharacteristicConnectDTO {
  @ApiProperty({ default: '' })
  campsiteId: string;

  @ApiProperty({ default: [] })
  characteristicIds: string[];
}
