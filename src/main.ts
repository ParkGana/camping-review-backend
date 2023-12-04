import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 3000;

  const app = await NestFactory.create(AppModule);

  await app.listen(port);

  Logger.verbose(`Application is running on port ${port}`);
}
bootstrap();
