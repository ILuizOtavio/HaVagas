import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCoworkingDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  endereco: string;

  @IsString()
  @IsNotEmpty()
  bairro: string;

  @IsString()
  @IsNotEmpty()
  telefone: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsArray()
  @IsOptional()
  imagens?: string[];

  @IsString()
  @IsOptional()
  website?: string;

  @IsString()
  @IsOptional()
  horarioAbertura?: string;

  @IsString()
  @IsOptional()
  horarioFechamento?: string;
}

export class UpdateCoworkingDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsString()
  @IsOptional()
  endereco?: string;

  @IsString()
  @IsOptional()
  bairro?: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsArray()
  @IsOptional()
  imagens?: string[];

  @IsString()
  @IsOptional()
  website?: string;

  @IsString()
  @IsOptional()
  horarioAbertura?: string;

  @IsString()
  @IsOptional()
  horarioFechamento?: string;

  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}
