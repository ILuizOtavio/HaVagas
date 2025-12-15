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
      useFactory: (configService: ConfigService) => {
        // Caminho persistente para o banco de dados
        const dbPath = process.env.NODE_ENV === 'production' 
          ? '/data/database.sqlite'
          : configService.get('DB_DATABASE', 'database.sqlite');
        
        console.log('📁 Caminho do banco de dados:', dbPath);
        
        return {
          type: 'better-sqlite3',
          database: dbPath,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true, // ATENÇÃO: usar false em produção
          logging: false,
          foreignKeys: true,
          enableWAL: false,
          prepareDatabase: (db: any) => {
            db.pragma('foreign_keys = ON');
            db.pragma('journal_mode = WAL');
          },
        };
      },
      inject: [ConfigService],
    }),
    UsuariosModule,
    CoworkingsModule,
    EspacosModule,
    ReservasModule,
  ],
})
export class AppModule {}
