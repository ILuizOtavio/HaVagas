import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CoworkingsService } from '../services/coworkings.service';
import { CreateCoworkingDto, UpdateCoworkingDto } from '../dto/coworking.dto';

@ApiTags('coworkings')
@Controller('coworkings')
export class CoworkingsController {
  constructor(private readonly coworkingsService: CoworkingsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo coworking' })
  create(@Body() createCoworkingDto: CreateCoworkingDto) {
    return this.coworkingsService.create(createCoworkingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os coworkings' })
  findAll() {
    return this.coworkingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar coworking por ID' })
  findOne(@Param('id') id: string) {
    return this.coworkingsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar coworking' })
  update(@Param('id') id: string, @Body() updateCoworkingDto: UpdateCoworkingDto) {
    return this.coworkingsService.update(id, updateCoworkingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover coworking' })
  remove(@Param('id') id: string) {
    return this.coworkingsService.remove(id);
  }
}
