import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habit } from './habit.entity';
import { CreateHabitDto, UpdateHabitDto } from './habit.dto';

@Injectable()
export class HabitsService {
  constructor(
    @InjectRepository(Habit)
    private habitRepository: Repository<Habit>,
  ) {}

  async create(userId: string, createHabitDto: CreateHabitDto): Promise<Habit> {
    const habit = this.habitRepository.create({
      ...createHabitDto,
      user_id: userId,
      start_date: new Date(createHabitDto.start_date),
    });
    return this.habitRepository.save(habit);
  }

  async findAll(userId: string): Promise<Habit[]> {
    return this.habitRepository.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Habit | null> {
    return this.habitRepository.findOne({
      where: { id, user_id: userId },
    });
  }

  async update(
    id: string,
    userId: string,
    updateHabitDto: UpdateHabitDto,
  ): Promise<Habit | null> {
    await this.habitRepository.update({ id, user_id: userId }, updateHabitDto);
    return this.findOne(id, userId);
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.habitRepository.delete({ id, user_id: userId });
  }
}
