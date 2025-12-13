import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Espaco } from '../entities/espaco.entity';
import { EspacosService } from '../services/espacos.service';
import { EspacosController } from '../controllers/espacos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Espaco])],
  controllers: [EspacosController],
  providers: [EspacosService],
  exports: [EspacosService],
})
export class EspacosModule {}
