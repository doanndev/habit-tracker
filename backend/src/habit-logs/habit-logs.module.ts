import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitLogsService } from './habit-logs.service';
import { HabitLogsController } from './habit-logs.controller';
import { HabitLog } from './habit-log.entity';
import { Habit } from '../habits/habit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HabitLog, Habit])],
  controllers: [HabitLogsController],
  providers: [HabitLogsService],
  exports: [HabitLogsService],
})
export class HabitLogsModule {}
