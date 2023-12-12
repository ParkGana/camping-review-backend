import { Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { CampsiteEntity } from './campsite.entity';
import { CharacteristicEntity } from './characteristic.entity';

@Entity('campsite-characteristic')
export class CampsiteCharacteristicEntity extends DefaultEntity {
  @ManyToOne(() => CampsiteEntity, (campsite) => campsite.connect, {
    eager: true,
  })
  campsite: CampsiteEntity;

  @ManyToOne(
    () => CharacteristicEntity,
    (characteristic) => characteristic.connect,
    {
      eager: true,
    },
  )
  characteristic: CharacteristicEntity;
}
