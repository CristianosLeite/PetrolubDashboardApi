import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tickets')
export class Ticket {
  constructor(ticket: Partial<Ticket>) {
    Object.assign(this, ticket);
  }

  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'text', nullable: false })
  operation: string;

  @Column({ type: 'text', nullable: false })
  branch: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: false })
  driver: string;

  @Column({ type: 'text', nullable: false })
  plate: string;

  @Column({ type: 'real', nullable: false })
  volume: number;

  @Column({ type: 'text', nullable: false })
  status: string;

  @Column({ type: 'timestamp without time zone', nullable: false })
  created_at: string;

  @Column({ type: 'timestamp without time zone', nullable: false })
  updated_at: string;

  @Column({ type: 'text', nullable: false })
  created_by: string;
}
