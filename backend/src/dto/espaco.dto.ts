import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoEspaco } from '../entities/espaco.entity';

export class CreateEspacoDto {
  @ApiProperty({ description: 'Nome do espaço', example: 'Sala de Reunião Premium' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'Descrição do espaço', example: 'Sala ampla com vista panorâmica' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ enum: TipoEspaco, description: 'Tipo do espaço', example: TipoEspaco.SALA_REUNIAO })
  @IsEnum(TipoEspaco)
  tipo: TipoEspaco;

  @ApiProperty({ description: 'Capacidade de pessoas', example: 10, minimum: 1 })
  @IsNumber()
  @Min(1)
  capacidade: number;

  @ApiProperty({ description: 'Preço por hora em reais', example: 50.00, minimum: 0 })
  @IsNumber()
  @Min(0)
  precoPorHora: number;

  @ApiPropertyOptional({ description: 'Recursos disponíveis', example: ['Wi-Fi', 'Projetor', 'Ar-condicionado'] })
  @IsArray()
  @IsOptional()
  recursos?: string[];

  @ApiPropertyOptional({ description: 'URLs de imagens do espaço', example: ['https://images.unsplash.com/photo-1497366216548.jpg'] })
  @IsArray()
  @IsOptional()
  imagens?: string[];

  @ApiProperty({ description: 'ID do coworking ao qual o espaço pertence', example: '29057f41-d1c0-4e94-beac-cee8debf832b' })
  @IsString()
  @IsNotEmpty()
  coworkingId: string;
}

export class UpdateEspacoDto {
  @ApiPropertyOptional({ description: 'Nome do espaço' })
  @IsString()
  @IsOptional()
  nome?: string;

  @ApiPropertyOptional({ description: 'Descrição do espaço' })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiPropertyOptional({ enum: TipoEspaco, description: 'Tipo do espaço' })
  @IsEnum(TipoEspaco)
  @IsOptional()
  tipo?: TipoEspaco;

  @ApiPropertyOptional({ description: 'Capacidade de pessoas' })
  @IsNumber()
  @IsOptional()
  capacidade?: number;

  @ApiPropertyOptional({ description: 'Preço por hora em reais' })
  @IsNumber()
  @IsOptional()
  precoPorHora?: number;

  @ApiPropertyOptional({ description: 'Recursos disponíveis' })
  @IsArray()
  @IsOptional()
  recursos?: string[];

  @ApiPropertyOptional({ description: 'URLs de imagens do espaço' })
  @IsArray()
  @IsOptional()
  imagens?: string[];

  @ApiPropertyOptional({ description: 'Se o espaço está disponível para reserva' })
  @IsBoolean()
  @IsOptional()
  disponivel?: boolean;
}
