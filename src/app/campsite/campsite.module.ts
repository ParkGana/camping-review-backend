import { Module } from '@nestjs/common';
import { CampsiteController } from './campsite.controller';
import { CampsiteService } from './campsite.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampsiteRepository } from './campsite.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CampsiteRepository, UserRepository])],
  controllers: [CampsiteController],
  providers: [CampsiteService],
})
export class CampsiteModule {}
