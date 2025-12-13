import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Coworking } from './coworking.entity';
import { Reserva } from './reserva.entity';

export enum TipoEspaco {
  SALA_REUNIAO = 'SALA_REUNIAO',
  ESTACAO_TRABALHO = 'ESTACAO_TRABALHO',
  AUDITORIO = 'AUDITORIO',
  LABORATORIO = 'LABORATORIO',
}

@Entity('espacos')
export class Espaco {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({
    type: 'enum',
    enum: TipoEspaco,
  })
  tipo: TipoEspaco;

  @Column({ type: 'int' })
  capacidade: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precoPorHora: number;

  @Column({ type: 'simple-array', nullable: true })
  recursos: string[];

  @Column({ type: 'simple-array', nullable: true })
  imagens: string[];

  @Column({ default: true })
  disponivel: boolean;

  @Column({ name: 'coworking_id' })
  coworkingId: string;

  @ManyToOne(() => Coworking, (coworking) => coworking.espacos)
  @JoinColumn({ name: 'coworking_id' })
  coworking: Coworking;

  @OneToMany(() => Reserva, (reserva) => reserva.espaco)
  reservas: Reserva[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
