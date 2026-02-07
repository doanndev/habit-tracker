import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitLogsService } from './habit-logs.service';
import { HabitLogsController } from './habit-logs.controller';
import { HabitLog } from './habit-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HabitLog])],
  controllers: [HabitLogsController],
  providers: [HabitLogsService],
  exports: [HabitLogsService],
})
export class HabitLogsModule {}
