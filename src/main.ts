import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
  app.setGlobalPrefix('api');
  await app.listen(3000);
=======
  app.setGlobalPrefix('/api');
  await app.listen(8080);
>>>>>>> 4c312ad7ff39933879540de538ad049eefaede31
}
bootstrap();
