import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsuariosModule } from './modules/usuarios.module';
import { CoworkingsModule } from './modules/coworkings.module';
import { EspacosModule } from './modules/espacos.module';
import { ReservasModule } from './modules/reservas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // ATENÇÃO: usar false em produção
        logging: false,
      }),
      inject: [ConfigService],
    }),
    UsuariosModule,
    CoworkingsModule,
    EspacosModule,
    ReservasModule,
  ],
})
export class AppModule {}
