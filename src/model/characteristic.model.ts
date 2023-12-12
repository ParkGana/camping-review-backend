import { ApiProperty, PickType } from '@nestjs/swagger';
import { CharacteristicEntity } from 'src/entity/characteristic.entity';

export class CharacteristicModel extends PickType(CharacteristicEntity, [
  'id',
  'type',
  'contents',
] as const) {
  constructor(properties: CharacteristicModel) {
    super();
    this.id = properties.id;
    this.type = properties.type;
    this.contents = properties.contents;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  contents: string;
}
