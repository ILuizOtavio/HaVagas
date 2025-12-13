import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Espaco } from '../entities/espaco.entity';
import { CreateEspacoDto, UpdateEspacoDto } from '../dto/espaco.dto';

@Injectable()
export class EspacosService {
  constructor(
    @InjectRepository(Espaco)
    private espacosRepository: Repository<Espaco>,
  ) {}

  async create(createEspacoDto: CreateEspacoDto): Promise<Espaco> {
    const espaco = this.espacosRepository.create(createEspacoDto);
    return this.espacosRepository.save(espaco);
  }

  async findAll(coworkingId?: string): Promise<Espaco[]> {
    const where: any = { disponivel: true };
    if (coworkingId) {
      where.coworkingId = coworkingId;
    }

    return this.espacosRepository.find({
      where,
      relations: ['coworking'],
    });
  }

  async findOne(id: string): Promise<Espaco> {
    const espaco = await this.espacosRepository.findOne({
      where: { id },
      relations: ['coworking'],
    });

    if (!espaco) {
      throw new NotFoundException('Espaço não encontrado');
    }

    return espaco;
  }

  async update(id: string, updateEspacoDto: UpdateEspacoDto): Promise<Espaco> {
    const espaco = await this.findOne(id);
    Object.assign(espaco, updateEspacoDto);
    return this.espacosRepository.save(espaco);
  }

  async remove(id: string): Promise<void> {
    const espaco = await this.findOne(id);
    await this.espacosRepository.remove(espaco);
  }
}
