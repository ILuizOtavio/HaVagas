import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCoworkingDto {
  @ApiProperty({ description: 'Nome do coworking', example: 'CAJUHUB' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'Descrição do coworking', example: 'O maior hub de inovação de Sergipe' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ description: 'Endereço do coworking', example: 'Av. Dr. Carlos Rodrigues da Cruz, 1285' })
  @IsString()
  @IsNotEmpty()
  endereco: string;

  @ApiProperty({ description: 'Bairro', example: 'Capucho' })
  @IsString()
  @IsNotEmpty()
  bairro: string;

  @ApiProperty({ description: 'Telefone de contato', example: '(79) 3021-5050' })
  @IsString()
  @IsNotEmpty()
  telefone: string;

  @ApiPropertyOptional({ description: 'Email de contato', example: 'contato@cajuhub.com' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'Array de URLs de imagens', example: ['https://images.unsplash.com/photo-1497366216548.jpg'] })
  @IsArray()
  @IsOptional()
  imagens?: string[];

  @ApiPropertyOptional({ description: 'Website', example: 'https://cajuhub.com' })
  @IsString()
  @IsOptional()
  website?: string;

  @ApiPropertyOptional({ description: 'Horário de abertura', example: '08:00' })
  @IsString()
  @IsOptional()
  horarioAbertura?: string;

  @ApiPropertyOptional({ description: 'Horário de fechamento', example: '18:00' })
  @IsString()
  @IsOptional()
  horarioFechamento?: string;
}

export class UpdateCoworkingDto {
  @ApiPropertyOptional({ description: 'Nome do coworking' })
  @IsString()
  @IsOptional()
  nome?: string;

  @ApiPropertyOptional({ description: 'Descrição do coworking' })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiPropertyOptional({ description: 'Endereço do coworking' })
  @IsString()
  @IsOptional()
  endereco?: string;

  @ApiPropertyOptional({ description: 'Bairro' })
  @IsString()
  @IsOptional()
  bairro?: string;

  @ApiPropertyOptional({ description: 'Telefone de contato' })
  @IsString()
  @IsOptional()
  telefone?: string;

  @ApiPropertyOptional({ description: 'Email de contato' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'Array de URLs de imagens' })
  @IsArray()
  @IsOptional()
  imagens?: string[];

  @ApiPropertyOptional({ description: 'Website' })
  @IsString()
  @IsOptional()
  website?: string;

  @ApiPropertyOptional({ description: 'Horário de abertura' })
  @IsString()
  @IsOptional()
  horarioAbertura?: string;

  @ApiPropertyOptional({ description: 'Horário de fechamento' })
  @IsString()
  @IsOptional()
  horarioFechamento?: string;

  @ApiPropertyOptional({ description: 'Status ativo/inativo' })
  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}
