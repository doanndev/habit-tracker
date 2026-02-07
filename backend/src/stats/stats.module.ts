import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { HabitLog } from '../habit-logs/habit-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HabitLog])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
