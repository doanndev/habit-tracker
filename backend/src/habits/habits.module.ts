import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitsService } from './habits.service';
import { HabitsController } from './habits.controller';
import { Habit } from './habit.entity';
import { HabitLog } from '../habit-logs/habit-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Habit, HabitLog])],
  controllers: [HabitsController],
  providers: [HabitsService],
  exports: [HabitsService],
})
export class HabitsModule {}
