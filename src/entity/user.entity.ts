import { IsDate, IsString } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { CampsiteEntity } from './campsite.entity';
import { CharacteristicEntity } from './characteristic.entity';

@Entity('user')
@Unique(['email'])
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  @IsString()
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @IsDate()
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  @IsDate()
  deletedAt: Date | null;

  @Column()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsString()
  profileImage: string | null;

  @Column({ nullable: true })
  @IsString()
  connectionEmail: string | null;

  @Column({ nullable: true })
  @IsString()
  connectionState: string | null;

  @OneToMany(() => CampsiteEntity, (campsite) => campsite.user, {
    eager: false,
  })
  campsites: CampsiteEntity[];

  @OneToMany(
    () => CharacteristicEntity,
    (characteristic) => characteristic.user,
    {
      eager: false,
    },
  )
  characteristics: CharacteristicEntity[];
}
