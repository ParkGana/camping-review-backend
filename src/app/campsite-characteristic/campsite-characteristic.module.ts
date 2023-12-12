import { Module } from '@nestjs/common';
import { CampsiteCharacteristicController } from './campsite-characteristic.controller';
import { CampsiteCharacteristicService } from './campsite-characteristic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampsiteCharacteristicRepository } from './campsite-characteristic.repository';
import { CampsiteRepository } from '../campsite/campsite.repository';
import { CharacteristicRepository } from '../characteristic/characteristic.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CampsiteCharacteristicRepository,
      CampsiteRepository,
      CharacteristicRepository,
    ]),
  ],
  controllers: [CampsiteCharacteristicController],
  providers: [CampsiteCharacteristicService],
})
export class CampsiteCharacteristicModule {}
