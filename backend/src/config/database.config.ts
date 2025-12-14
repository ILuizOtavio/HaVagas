import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'better-sqlite3',
  database: configService.get('DB_DATABASE', 'database.sqlite'),
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  synchronize: true,
  prepareDatabase: (db: any) => {
    db.pragma('foreign_keys = ON');
  },
});
