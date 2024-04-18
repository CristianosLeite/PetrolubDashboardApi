import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Processo } from './processos.entity';

@Entity('eventos')
export class Evento {
  constructor(evento: Partial<Evento>) {
    Object.assign(this, evento);
  }

  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  evento_id: number;

  @Column({ type: 'bigint', nullable: false })
  processo_id: number;

  @Column({ type: 'text', nullable: false })
  evento: string;

  @Column({ type: 'boolean', nullable: false })
  status: boolean;

  @Column({ type: 'timestamp without time zone', nullable: false })
  data_hora_evento: string;

  @ManyToOne(() => Processo, (processo) => processo.eventos)
  @JoinColumn({ name: 'processo_id' })
  processo: Processo;
}
