import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { IsString } from 'class-validator';
import { UserEntity } from './user.entity';
import { CampsiteCharacteristicEntity } from './campsite-characteristic.entity';

@Entity('characteristic')
export class CharacteristicEntity extends DefaultEntity {
  @Column()
  @IsString()
  type: string;

  @Column()
  @IsString()
  contents: string;

  @ManyToOne(() => UserEntity, (user) => user.characteristics, {
    eager: true,
  })
  user: UserEntity;

  @OneToMany(
    () => CampsiteCharacteristicEntity,
    (campsiteCharacteristic) => campsiteCharacteristic.characteristic,
    {
      eager: false,
    },
  )
  connect: CampsiteCharacteristicEntity[];
}
