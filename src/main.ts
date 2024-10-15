import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot:true
  });

  app.setGlobalPrefix('api/v2');
app.useGlobalPipes(new ValidationPipe({

  whitelist:true,
  transform:true,
  forbidNonWhitelisted:true,
  transformOptions:{
    enableImplicitConversion:true
  }
}));
  await app.listen(process.env.PORT);
}
bootstrap();
