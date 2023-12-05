import { ApiProperty } from '@nestjs/swagger';

export class ConnectionDTO {
  @ApiProperty({ default: '' })
  sender: string;

  @ApiProperty({ default: '' })
  receiver: string;
}
