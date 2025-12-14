import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StatusReserva } from '../entities/reserva.entity';

export class CreateReservaDto {
  @ApiProperty({ description: 'ID do espaço a ser reservado', example: 'eec69fec-c3da-4166-8f9f-e32479df059d' })
  @IsString()
  @IsNotEmpty()
  espacoId: string;

  @ApiProperty({ description: 'Data e hora de início da reserva', example: '2025-12-15T10:00:00' })
  @IsDateString()
  dataInicio: string;

  @ApiProperty({ description: 'Data e hora de término da reserva', example: '2025-12-15T12:00:00' })
  @IsDateString()
  dataFim: string;

  @ApiPropertyOptional({ description: 'Observações sobre a reserva', example: 'Reunião importante com cliente' })
  @IsString()
  @IsOptional()
  observacoes?: string;
}

export class UpdateReservaDto {
  @ApiPropertyOptional({ enum: StatusReserva, description: 'Status da reserva' })
  @IsEnum(StatusReserva)
  @IsOptional()
  status?: StatusReserva;

  @ApiPropertyOptional({ description: 'Observações sobre a reserva' })
  @IsString()
  @IsOptional()
  observacoes?: string;
}
