import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HabitLog } from './habit-log.entity';
import { CreateHabitLogDto } from './habit-log.dto';
import { Habit } from '../habits/habit.entity';

@Injectable()
export class HabitLogsService {
  constructor(
    @InjectRepository(HabitLog)
    private habitLogRepository: Repository<HabitLog>,
    @InjectRepository(Habit)
    private habitRepository: Repository<Habit>,
  ) {}

  // Validate habit ownership then create a log
  async create(
    userId: string,
    habitId: string,
    createHabitLogDto: CreateHabitLogDto,
  ): Promise<HabitLog> {
    const habit = await this.habitRepository.findOne({ where: { id: habitId, user_id: userId } });
    if (!habit) throw new NotFoundException('Habit not found');

    const habitLog = this.habitLogRepository.create({
      habit_id: habitId,
      date: new Date(createHabitLogDto.date),
      status: createHabitLogDto.status,
    });
    return this.habitLogRepository.save(habitLog);
  }

  async findByHabit(userId: string, habitId: string): Promise<HabitLog[]> {
    const habit = await this.habitRepository.findOne({ where: { id: habitId, user_id: userId } });
    if (!habit) throw new NotFoundException('Habit not found');

    return this.habitLogRepository.find({
      where: { habit_id: habitId },
      order: { date: 'DESC' },
    });
  }

  async checkin(userId: string, habitId: string, date: string): Promise<HabitLog> {
    const habit = await this.habitRepository.findOne({ where: { id: habitId, user_id: userId } });
    if (!habit) throw new NotFoundException('Habit not found');

    const existingLog = await this.habitLogRepository.findOne({
      where: { habit_id: habitId, date: new Date(date) },
    });

    if (existingLog) {
      return existingLog;
    }

    return this.create(userId, habitId, { date, status: 'completed' });
  }

  async remove(userId: string, habitId: string, date: string): Promise<void> {
    const habit = await this.habitRepository.findOne({ where: { id: habitId, user_id: userId } });
    if (!habit) throw new NotFoundException('Habit not found');

    await this.habitLogRepository.delete({
      habit_id: habitId,
      date: new Date(date),
    });
  }
}
