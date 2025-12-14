import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Email do usuário', example: 'joao@email.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Senha do usuário', example: '123456' })
  @IsString()
  @IsNotEmpty()
  senha: string;
}

export class CreateUsuarioDto {
  @ApiProperty({ description: 'Nome completo do usuário', example: 'João Silva' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'Email do usuário', example: 'joao.silva@email.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Telefone do usuário', example: '(79) 99999-1111' })
  @IsString()
  @IsNotEmpty()
  telefone: string;

  @ApiProperty({ description: 'Senha do usuário (mínimo 6 caracteres)', example: '123456', minLength: 6 })
  @IsString()
  @MinLength(6)
  senha: string;

  @ApiPropertyOptional({ description: 'Nome da empresa do usuário', example: 'Tech Solutions' })
  @IsString()
  @IsOptional()
  empresa?: string;
}

export class UpdateUsuarioDto {
  @ApiPropertyOptional({ description: 'Nome completo do usuário' })
  @IsString()
  @IsOptional()
  nome?: string;

  @ApiPropertyOptional({ description: 'Telefone do usuário' })
  @IsString()
  @IsOptional()
  telefone?: string;

  @ApiPropertyOptional({ description: 'Nome da empresa do usuário' })
  @IsString()
  @IsOptional()
  empresa?: string;
}
