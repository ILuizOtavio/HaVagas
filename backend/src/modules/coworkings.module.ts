import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coworking } from '../entities/coworking.entity';
import { CoworkingsService } from '../services/coworkings.service';
import { CoworkingsController } from '../controllers/coworkings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Coworking])],
  controllers: [CoworkingsController],
  providers: [CoworkingsService],
  exports: [CoworkingsService],
})
export class CoworkingsModule {}
