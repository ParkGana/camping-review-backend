import { Module } from '@nestjs/common';
import { TypeORMConfig } from '../typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './app/user/user.module';
import { CampsiteModule } from './app/campsite/campsite.module';
import { CharacteristicModule } from './app/characteristic/characteristic.module';
import { CampsiteCharacteristicModule } from './app/campsite-characteristic/campsite-characteristic.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeORMConfig),
    UserModule,
    CampsiteModule,
    CharacteristicModule,
    CampsiteCharacteristicModule,
  ],
})
export class AppModule {}
