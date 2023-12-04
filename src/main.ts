import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = 3000;

  const app = await NestFactory.create(AppModule);

  /* cors 설정 */
  app.enableCors();

  /* swagger 설정 */
  const swaggerConfig = new DocumentBuilder().setTitle('API').build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port);

  Logger.verbose(`Application is running on port ${port}`);
}
bootstrap();
