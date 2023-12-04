import { Module } from '@nestjs/common';
import { TypeORMConfig } from '../typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(TypeORMConfig)],
})
export class AppModule {}
