import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }

  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ type: 'text', nullable: false, unique: true })
  username: string;

  @Column({ type: 'text', nullable: false, unique: true })
  usercode: string;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ unique: true, nullable: true })
  register_number: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: false, default: 'user' })
  role: string;

  @Column({ type: 'date', unique: false })
  created_at: string;

  @Column({ nullable: false, default: 'Activated' })
  situation: string;
}
