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
        const isProduction = process.env.NODE_ENV === 'production';
        const databaseUrl = configService.get('DATABASE_URL');
        
        // PostgreSQL em produção (Railway), SQLite em desenvolvimento
        if (isProduction && databaseUrl) {
          console.log('🐘 Conectando ao PostgreSQL (Railway)');
          return {
            type: 'postgres',
            url: databaseUrl,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            logging: false,
            ssl: {
              rejectUnauthorized: false,
            },
          };
        }
        
        // SQLite para desenvolvimento local
        const dbPath = configService.get('DB_DATABASE', 'database.sqlite');
        console.log('📁 SQLite local:', dbPath);
        
        return {
          type: 'better-sqlite3',
          database: dbPath,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
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
