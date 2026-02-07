import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HabitLog } from './habit-log.entity';
import { CreateHabitLogDto } from './habit-log.dto';

@Injectable()
export class HabitLogsService {
  constructor(
    @InjectRepository(HabitLog)
    private habitLogRepository: Repository<HabitLog>,
  ) {}

  async create(
    habitId: string,
    createHabitLogDto: CreateHabitLogDto,
  ): Promise<HabitLog> {
    const habitLog = this.habitLogRepository.create({
      habit_id: habitId,
      date: new Date(createHabitLogDto.date),
      status: createHabitLogDto.status,
    });
    return this.habitLogRepository.save(habitLog);
  }

  async findByHabit(habitId: string): Promise<HabitLog[]> {
    return this.habitLogRepository.find({
      where: { habit_id: habitId },
      order: { date: 'DESC' },
    });
  }

  async checkin(habitId: string, date: string): Promise<HabitLog> {
    const existingLog = await this.habitLogRepository.findOne({
      where: { habit_id: habitId, date: new Date(date) },
    });

    if (existingLog) {
      return existingLog;
    }

    return this.create(habitId, { date, status: 'completed' });
  }

  async remove(habitId: string, date: string): Promise<void> {
    await this.habitLogRepository.delete({
      habit_id: habitId,
      date: new Date(date),
    });
  }
}
