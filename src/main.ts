import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

//Ici l'adresse localhost8085 avec le prefix /api pour effectuer le CRUD.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: '*',
    methods: 'GET, PUT, POST,PATCH, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(8085);
}
bootstrap();
