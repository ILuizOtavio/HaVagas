import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();
let app;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(server),
    );

    // CORS
    app.enableCors();

    // Validation
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    // Swagger Documentation
    const config = new DocumentBuilder()
      .setTitle('Há Vagas API')
      .setDescription('API do sistema de gerenciamento de coworkings de Aracaju')
      .setVersion('1.0')
      .addTag('usuarios')
      .addTag('coworkings')
      .addTag('espacos')
      .addTag('reservas')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.init();
  }

  return app.getHttpAdapter().getInstance();
}

export default async (req, res) => {
  const app = await bootstrap();
  return app(req, res);
};
