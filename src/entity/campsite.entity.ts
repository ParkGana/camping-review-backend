import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { DefaultEntity } from './default.entity';
import { IsString } from 'class-validator';
import { UserEntity } from './user.entity';

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
  feeling: string;

  @Column()
  @IsString()
  inTime: string;

  @Column()
  @IsString()
  outTime: string;

  @ManyToOne(() => UserEntity, (user) => user.campsites, {
    eager: true,
  })
  user: UserEntity;
}
