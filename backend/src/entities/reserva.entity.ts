import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Espaco } from './espaco.entity';

export enum StatusReserva {
  PENDENTE = 'PENDENTE',
  CONFIRMADA = 'CONFIRMADA',
  CANCELADA = 'CANCELADA',
  CONCLUIDA = 'CONCLUIDA',
}

@Entity('reservas')
export class Reserva {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id' })
  usuarioId: string;

  @Column({ name: 'espaco_id' })
  espacoId: string;

  @Column({ type: 'datetime' })
  dataInicio: Date;

  @Column({ type: 'datetime' })
  dataFim: Date;

  @Column({ type: 'real' })
  valorTotal: number;

  @Column({
    type: 'text',
    default: StatusReserva.PENDENTE,
  })
  status: StatusReserva;

  @Column({ type: 'text', nullable: true })
  observacoes: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.reservas)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Espaco, (espaco) => espaco.reservas)
  @JoinColumn({ name: 'espaco_id' })
  espaco: Espaco;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
