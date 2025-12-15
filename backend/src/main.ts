import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { runSeed } from './database/seeds/seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  const port = process.env.PORT || 3001;
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
  console.log(`📚 Documentação disponível em http://localhost:${port}/api`);

  // Executar seed após o servidor estar rodando
  try {
    const dataSource = app.get(DataSource);
    const usuarioRepository = dataSource.getRepository('Usuario');
    const count = await usuarioRepository.count();
    
    if (count === 0) {
      console.log('🌱 Banco de dados vazio. Executando seed...');
      await runSeed(dataSource);
      console.log('✅ Seed concluído!');
    } else {
      console.log('✅ Banco de dados já possui dados');
    }
  } catch (error) {
    console.error('⚠️  Erro ao verificar/popular banco:', error.message);
  }
}

bootstrap();
  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
  console.log(`📚 Documentação disponível em http://localhost:${port}/api`);
}

bootstrap();
