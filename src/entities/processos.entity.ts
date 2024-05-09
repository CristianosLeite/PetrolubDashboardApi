import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Evento } from './eventos.entity';

@Entity('processos')
export class Processo {
  constructor(processo: Partial<Processo>) {
    Object.assign(this, processo);
  }

  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  processo_id: number;

  @Column({ type: 'text', nullable: true })
  ticket: string;

  @Column({ type: 'text', nullable: false })
  tipo_operacao: string;

  @Column({ type: 'timestamp without time zone', nullable: false })
  data_hora_inicio: string;

  @Column({ type: 'timestamp without time zone', nullable: true })
  data_hora_fim: string;

  @Column({ type: 'text', nullable: false })
  operador: string;

  @Column({ type: 'text', nullable: false })
  motorista: string;

  @Column({ type: 'text', nullable: false })
  placa: string;

  @Column({ type: 'real', nullable: false })
  qnt_litros_informado: string;

  @Column({ type: 'jsonb', nullable: true })
  bateladas: string;

  @Column({ type: 'real', nullable: true })
  total_litros_processo: string;

  @OneToMany(() => Evento, (evento) => evento.processo, { eager: false })
  @JoinColumn({ name: 'processo_id' })
  eventos: Evento[];
}
