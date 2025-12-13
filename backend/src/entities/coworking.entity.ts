import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Espaco } from './espaco.entity';

@Entity('coworkings')
export class Coworking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  nome: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ length: 255 })
  endereco: string;

  @Column({ length: 100 })
  bairro: string;

  @Column({ length: 20 })
  telefone: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ type: 'simple-array', nullable: true })
  imagens: string[];

  @Column({ type: 'text', nullable: true })
  website: string;

  @Column({ type: 'time', nullable: true, name: 'horario_abertura' })
  horarioAbertura: string;

  @Column({ type: 'time', nullable: true, name: 'horario_fechamento' })
  horarioFechamento: string;

  @Column({ default: true })
  ativo: boolean;

  @OneToMany(() => Espaco, (espaco) => espaco.coworking)
  espacos: Espaco[];

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
