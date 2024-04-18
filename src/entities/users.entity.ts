import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }

  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ type: 'text', nullable: false, unique: true })
  cod_user: string;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ unique: true })
  register_number: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'date', unique: false })
  created_at: string;

  @Column({ nullable: false, default: 'Activated' })
  situation: string;
}
