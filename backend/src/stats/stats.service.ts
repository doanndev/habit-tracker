import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HabitLog } from '../habit-logs/habit-log.entity';
import { Habit } from '../habits/habit.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(HabitLog)
    private habitLogRepository: Repository<HabitLog>,
    @InjectRepository(Habit)
    private habitRepository: Repository<Habit>,
  ) {}

  async getHabitStats(userId: string, habitId: string) {
    // ensure habit belongs to the authenticated user
    const habit = await this.habitRepository.findOne({ where: { id: habitId, user_id: userId } });
    if (!habit) throw new NotFoundException('Habit not found');

    const logs = await this.habitLogRepository.find({
      where: { habit_id: habitId },
      order: { date: 'DESC' },
    });

    const currentStreak = this.calculateCurrentStreak(logs);
    const longestStreak = this.calculateLongestStreak(logs);
    const completionRate = this.calculateCompletionRate(logs);

    return {
      currentStreak,
      longestStreak,
      completionRate,
      totalLogs: logs.length,
    };
  }

  private calculateCurrentStreak(logs: HabitLog[]): number {
    if (logs.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sortedLogs = logs.sort((a, b) => b.date.getTime() - a.date.getTime());

    for (const log of sortedLogs) {
      const logDate = new Date(log.date);
      logDate.setHours(0, 0, 0, 0);

      if (
        logDate.getTime() ===
        today.getTime() - streak * 24 * 60 * 60 * 1000
      ) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }

  private calculateLongestStreak(logs: HabitLog[]): number {
    if (logs.length === 0) return 0;

    const sortedLogs = logs.sort((a, b) => a.date.getTime() - b.date.getTime());
    let longestStreak = 0;
    let currentStreak = 1;

    for (let i = 1; i < sortedLogs.length; i++) {
      const prevDate = new Date(sortedLogs[i - 1].date);
      const currDate = new Date(sortedLogs[i].date);
      const diffTime = currDate.getTime() - prevDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        currentStreak++;
      } else {
        longestStreak = Math.max(longestStreak, currentStreak);
        currentStreak = 1;
      }
    }

    return Math.max(longestStreak, currentStreak);
  }

  private calculateCompletionRate(logs: HabitLog[]): number {
    if (logs.length === 0) return 0;

    const completedLogs = logs.filter(
      (log) => log.status === 'completed',
    ).length;
    return Math.round((completedLogs / logs.length) * 100);
  }
}
