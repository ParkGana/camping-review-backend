import { Module } from '@nestjs/common';
import { TypeORMConfig } from '../typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(TypeORMConfig), UserModule],
})
export class AppModule {}
