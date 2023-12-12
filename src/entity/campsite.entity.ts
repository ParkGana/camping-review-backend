import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { IsString } from 'class-validator';
import { UserEntity } from './user.entity';
import { CampsiteCharacteristicEntity } from './campsite-characteristic.entity';

@Entity('campsite')
@Unique(['name'])
export class CampsiteEntity extends DefaultEntity {
  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  address: string;

  @Column()
  @IsString()
  inTime: string;

  @Column()
  @IsString()
  outTime: string;

  @Column()
  @IsString()
  type: string;

  @Column()
  @IsString()
  feeling: string;

  @ManyToOne(() => UserEntity, (user) => user.campsites, {
    eager: true,
  })
  user: UserEntity;

  @OneToMany(
    () => CampsiteCharacteristicEntity,
    (campsiteCharacteristic) => campsiteCharacteristic.campsite,
    {
      eager: false,
    },
  )
  connect: CampsiteCharacteristicEntity[];
}
