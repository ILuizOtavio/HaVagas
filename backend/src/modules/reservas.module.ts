import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from '../entities/reserva.entity';
import { ReservasService } from '../services/reservas.service';
import { ReservasController } from '../controllers/reservas.controller';
import { EspacosModule } from './espacos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva]), EspacosModule],
  controllers: [ReservasController],
  providers: [ReservasService],
  exports: [ReservasService],
})
export class ReservasModule {}
