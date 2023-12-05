import { IsDate, IsString } from 'class-validator';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

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
  connectionEmail: string | null;

  @Column({ nullable: true })
  connectionState: string | null;
}
