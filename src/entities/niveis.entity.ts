import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Evento } from './eventos.entity';

@Entity('niveis')
export class Nivel {
  constructor(nivel: Partial<Nivel>) {
    Object.assign(this, nivel);
  }

  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  nivel_id: number;

  @Column({ type: 'bigint', nullable: false })
  processo_id: number;

  @Column({ type: 'bigint', nullable: false })
  evento_id: number;

  @Column({ type: 'real', nullable: false })
  nivel_tq_med_1: number;

  @Column({ type: 'real', nullable: false })
  nivel_tq_med_2: number;

  @Column({ type: 'real', nullable: false })
  nivel_tq_arm_1: number;

  @Column({ type: 'real', nullable: false })
  nivel_tq_arm_2: number;

  @Column({ type: 'real', nullable: false })
  nivel_tq_arm_3: number;

  @Column({ type: 'real', nullable: false })
  nivel_tq_arm_4: number;

  @Column({ type: 'timestamp without time zone', nullable: false })
  data_hora_evento: string;

  @OneToOne(() => Evento, (evento) => evento.evento_id, { eager: false })
  @JoinColumn({ name: 'evento_id' })
  evento: Evento[];
}
