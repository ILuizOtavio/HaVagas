import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coworking } from '../entities/coworking.entity';
import { CreateCoworkingDto, UpdateCoworkingDto } from '../dto/coworking.dto';

@Injectable()
export class CoworkingsService {
  constructor(
    @InjectRepository(Coworking)
    private coworkingsRepository: Repository<Coworking>,
  ) {}

  async create(createCoworkingDto: CreateCoworkingDto): Promise<Coworking> {
    const coworking = this.coworkingsRepository.create(createCoworkingDto);
    return this.coworkingsRepository.save(coworking);
  }

  async findAll(): Promise<Coworking[]> {
    return this.coworkingsRepository.find({
      where: { ativo: true },
      relations: ['espacos'],
    });
  }

  async findOne(id: string): Promise<Coworking> {
    const coworking = await this.coworkingsRepository.findOne({
      where: { id },
      relations: ['espacos'],
    });

    if (!coworking) {
      throw new NotFoundException('Coworking não encontrado');
    }

    return coworking;
  }

  async update(id: string, updateCoworkingDto: UpdateCoworkingDto): Promise<Coworking> {
    const coworking = await this.findOne(id);
    Object.assign(coworking, updateCoworkingDto);
    return this.coworkingsRepository.save(coworking);
  }

  async remove(id: string): Promise<void> {
    const coworking = await this.findOne(id);
    await this.coworkingsRepository.remove(coworking);
  }
}
