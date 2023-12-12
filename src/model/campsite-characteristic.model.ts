import { ApiProperty, PickType } from '@nestjs/swagger';
import { CampsiteCharacteristicEntity } from 'src/entity/campsite-characteristic.entity';
import { CampsiteModel } from './campsite.model';
import { CharacteristicModel } from './characteristic.model';

export class CampsiteCharacteristicModel extends PickType(
  CampsiteCharacteristicEntity,
  ['id'] as const,
) {
  constructor(properties: CampsiteCharacteristicModel) {
    super();
    this.id = properties.id;
    this.campsite = new CampsiteModel(properties.campsite);
    this.characteristic = new CharacteristicModel(properties.characteristic);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  campsite: CampsiteModel;

  @ApiProperty()
  characteristic: CharacteristicModel;
}
