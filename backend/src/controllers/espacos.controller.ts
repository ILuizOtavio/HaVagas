import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { EspacosService } from '../services/espacos.service';
import { CreateEspacoDto, UpdateEspacoDto } from '../dto/espaco.dto';

@ApiTags('espacos')
@Controller('espacos')
export class EspacosController {
  constructor(private readonly espacosService: EspacosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo espaço' })
  create(@Body() createEspacoDto: CreateEspacoDto) {
    return this.espacosService.create(createEspacoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os espaços' })
  @ApiQuery({ name: 'coworkingId', required: false })
  findAll(@Query('coworkingId') coworkingId?: string) {
    return this.espacosService.findAll(coworkingId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar espaço por ID' })
  findOne(@Param('id') id: string) {
    return this.espacosService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar espaço' })
  update(@Param('id') id: string, @Body() updateEspacoDto: UpdateEspacoDto) {
    return this.espacosService.update(id, updateEspacoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover espaço' })
  remove(@Param('id') id: string) {
    return this.espacosService.remove(id);
  }
}
