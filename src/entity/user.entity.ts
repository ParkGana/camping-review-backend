import { IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { DefaultEntity } from './default.entity';

@Entity('user')
export class UserEntity extends DefaultEntity {
  @Column()
  @IsString()
  email: string;

  @Column()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsString()
  profileImage: string | null;
}
