import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { IsString } from 'class-validator';
import { UserEntity } from './user.entity';

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
}
