import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { HabitLog } from '../habit-logs/habit-log.entity';

@Entity('habits')
export class Habit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User, (user) => user.habits)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;

  @Column({ default: 'daily' })
  frequency: string;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ default: '#3B82F6' })
  color: string;

  @Column({ default: false })
  is_archived: boolean;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => HabitLog, (log) => log.habit)
  logs: HabitLog[];
}
