import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Habit } from '../habits/habit.entity';

@Entity('habit_logs')
@Unique(['habit_id', 'date'])
export class HabitLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  habit_id: string;

  @ManyToOne(() => Habit, (habit) => habit.logs)
  @JoinColumn({ name: 'habit_id' })
  habit: Habit;

  @Column({ type: 'date' })
  date: Date;

  @Column({ default: 'completed' })
  status: string;
}
