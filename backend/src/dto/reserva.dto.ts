import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { StatusReserva } from '../entities/reserva.entity';

export class CreateReservaDto {
  @IsString()
  @IsNotEmpty()
  espacoId: string;

  @IsDateString()
  dataInicio: string;

  @IsDateString()
  dataFim: string;

  @IsString()
  @IsOptional()
  observacoes?: string;
}

export class UpdateReservaDto {
  @IsEnum(StatusReserva)
  @IsOptional()
  status?: StatusReserva;

  @IsString()
  @IsOptional()
  observacoes?: string;
}
