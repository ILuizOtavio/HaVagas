import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ReservasService } from '../services/reservas.service';
import { CreateReservaDto, UpdateReservaDto } from '../dto/reserva.dto';

@ApiTags('reservas')
@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova reserva' })
  create(
    @Query('usuarioId') usuarioId: string,
    @Body() createReservaDto: CreateReservaDto,
  ) {
    return this.reservasService.create(usuarioId, createReservaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as reservas' })
  @ApiQuery({ name: 'usuarioId', required: false })
  @ApiQuery({ name: 'espacoId', required: false })
  findAll(
    @Query('usuarioId') usuarioId?: string,
    @Query('espacoId') espacoId?: string,
  ) {
    return this.reservasService.findAll(usuarioId, espacoId);
  }

  @Get('agenda/:espacoId')
  @ApiOperation({ summary: 'Visualizar agenda de um espaço' })
  getAgenda(
    @Param('espacoId') espacoId: string,
    @Query('dataInicio') dataInicio: string,
    @Query('dataFim') dataFim: string,
  ) {
    return this.reservasService.getAgenda(espacoId, dataInicio, dataFim);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar reserva por ID' })
  findOne(@Param('id') id: string) {
    return this.reservasService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar reserva' })
  update(@Param('id') id: string, @Body() updateReservaDto: UpdateReservaDto) {
    return this.reservasService.update(id, updateReservaDto);
  }

  @Put(':id/confirmar')
  @ApiOperation({ summary: 'Confirmar reserva pendente' })
  confirmar(@Param('id') id: string) {
    return this.reservasService.confirmar(id);
  }

  @Put(':id/concluir')
  @ApiOperation({ summary: 'Marcar reserva como concluída' })
  concluir(@Param('id') id: string) {
    return this.reservasService.concluir(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancelar reserva' })
  remove(@Param('id') id: string) {
    return this.reservasService.remove(id);
  }
}
