import { Module } from '@nestjs/common';
import { TypeORMConfig } from '../typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './app/user/user.module';
import { CampsiteModule } from './app/campsite/campsite.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeORMConfig), UserModule, CampsiteModule],
})
export class AppModule {}
