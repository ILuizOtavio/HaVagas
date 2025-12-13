import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { TipoEspaco } from '../entities/espaco.entity';

export class CreateEspacoDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsEnum(TipoEspaco)
  tipo: TipoEspaco;

  @IsNumber()
  @Min(1)
  capacidade: number;

  @IsNumber()
  @Min(0)
  precoPorHora: number;

  @IsArray()
  @IsOptional()
  recursos?: string[];

  @IsArray()
  @IsOptional()
  imagens?: string[];

  @IsString()
  @IsNotEmpty()
  coworkingId: string;
}

export class UpdateEspacoDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsEnum(TipoEspaco)
  @IsOptional()
  tipo?: TipoEspaco;

  @IsNumber()
  @IsOptional()
  capacidade?: number;

  @IsNumber()
  @IsOptional()
  precoPorHora?: number;

  @IsArray()
  @IsOptional()
  recursos?: string[];

  @IsArray()
  @IsOptional()
  imagens?: string[];

  @IsBoolean()
  @IsOptional()
  disponivel?: boolean;
}
