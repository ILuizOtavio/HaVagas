import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan, Between } from 'typeorm';
import { Reserva, StatusReserva } from '../entities/reserva.entity';
import { CreateReservaDto, UpdateReservaDto } from '../dto/reserva.dto';
import { EspacosService } from './espacos.service';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva)
    private reservasRepository: Repository<Reserva>,
    private espacosService: EspacosService,
  ) {}

  async create(usuarioId: string, createReservaDto: CreateReservaDto): Promise<Reserva> {
    const { espacoId, dataInicio, dataFim, observacoes } = createReservaDto;

    // Verificar se o espaço existe
    const espaco = await this.espacosService.findOne(espacoId);

    // Verificar conflitos de horário
    const conflito = await this.verificarConflito(espacoId, new Date(dataInicio), new Date(dataFim));
    if (conflito) {
      throw new BadRequestException('Já existe uma reserva para este horário');
    }

    // Calcular valor total
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);
    const horas = Math.ceil((fim.getTime() - inicio.getTime()) / (1000 * 60 * 60));
    const valorTotal = horas * Number(espaco.precoPorHora);

    const reserva = this.reservasRepository.create({
      usuarioId,
      espacoId,
      dataInicio: inicio,
      dataFim: fim,
      valorTotal,
      observacoes,
      status: StatusReserva.PENDENTE,
    });

    return this.reservasRepository.save(reserva);
  }

  async verificarConflito(espacoId: string, dataInicio: Date, dataFim: Date, reservaIdExcluir?: string): Promise<boolean> {
    const query = this.reservasRepository
      .createQueryBuilder('reserva')
      .where('reserva.espacoId = :espacoId', { espacoId })
      .andWhere('reserva.status != :status', { status: StatusReserva.CANCELADA })
      .andWhere(
        '(reserva.dataInicio < :dataFim AND reserva.dataFim > :dataInicio)',
        { dataInicio, dataFim }
      );

    if (reservaIdExcluir) {
      query.andWhere('reserva.id != :reservaIdExcluir', { reservaIdExcluir });
    }

    const conflitos = await query.getCount();
    return conflitos > 0;
  }

  async findAll(usuarioId?: string, espacoId?: string): Promise<Reserva[]> {
    const where: any = {};
    if (usuarioId) where.usuarioId = usuarioId;
    if (espacoId) where.espacoId = espacoId;

    return this.reservasRepository.find({
      where,
      relations: ['usuario', 'espaco', 'espaco.coworking'],
      order: { dataInicio: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Reserva> {
    const reserva = await this.reservasRepository.findOne({
      where: { id },
      relations: ['usuario', 'espaco', 'espaco.coworking'],
    });

    if (!reserva) {
      throw new NotFoundException('Reserva não encontrada');
    }

    return reserva;
  }

  async update(id: string, updateReservaDto: UpdateReservaDto): Promise<Reserva> {
    const reserva = await this.findOne(id);
    Object.assign(reserva, updateReservaDto);
    return this.reservasRepository.save(reserva);
  }

  async remove(id: string): Promise<void> {
    const reserva = await this.findOne(id);
    reserva.status = StatusReserva.CANCELADA;
    await this.reservasRepository.save(reserva);
  }

  async confirmar(id: string): Promise<Reserva> {
    const reserva = await this.findOne(id);
    
    if (reserva.status !== StatusReserva.PENDENTE) {
      throw new BadRequestException('Apenas reservas pendentes podem ser confirmadas');
    }

    reserva.status = StatusReserva.CONFIRMADA;
    return this.reservasRepository.save(reserva);
  }

  async concluir(id: string): Promise<Reserva> {
    const reserva = await this.findOne(id);
    
    if (reserva.status !== StatusReserva.CONFIRMADA) {
      throw new BadRequestException('Apenas reservas confirmadas podem ser concluídas');
    }

    reserva.status = StatusReserva.CONCLUIDA;
    return this.reservasRepository.save(reserva);
  }

  async getAgenda(espacoId: string, dataInicio: string, dataFim: string): Promise<Reserva[]> {
    return this.reservasRepository.find({
      where: {
        espacoId,
        status: StatusReserva.CONFIRMADA,
        dataInicio: Between(new Date(dataInicio), new Date(dataFim)),
      },
      relations: ['usuario'],
      order: { dataInicio: 'ASC' },
    });
  }
}
