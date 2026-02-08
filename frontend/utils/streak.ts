
import { Habit } from '../types';

/**
 * Calculates current streak, longest streak, and completion rate for a habit.
 */
export function calculateStats(habit: Habit) {
  const logs = [...habit.logs].sort((a, b) => b.date.localeCompare(a.date));
  const completedDates = new Set(habit.logs.filter(l => l.completed).map(l => l.date));
  
  const today = new Date();
  today.setHours(0,0,0,0);
  
  // Calculate Current Streak
  let currentStreak = 0;
  let checkDate = new Date(today);
  
  // If not completed today, check if completed yesterday. If neither, streak is 0.
  const todayStr = today.toISOString().split('T')[0];
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  const startCheckingFrom = completedDates.has(todayStr) ? today : (completedDates.has(yesterdayStr) ? yesterday : null);
  
  if (startCheckingFrom) {
    let cur = new Date(startCheckingFrom);
    while (completedDates.has(cur.toISOString().split('T')[0])) {
      currentStreak++;
      cur.setDate(cur.getDate() - 1);
    }
  }

  // Calculate Longest Streak
  let longestStreak = 0;
  let tempStreak = 0;
  
  // Sort dates for sequential checking
  const sortedDates = Array.from(completedDates).sort();
  if (sortedDates.length > 0) {
    let prev = new Date(sortedDates[0]);
    tempStreak = 1;
    longestStreak = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      let curr = new Date(sortedDates[i]);
      const diffTime = Math.abs(curr.getTime() - prev.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }
      longestStreak = Math.max(longestStreak, tempStreak);
      prev = curr;
    }
  }

  // Completion Rate (%)
  const startDate = new Date(habit.startDate);
  const totalDays = Math.max(1, Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1);
  const completionRate = Math.round((completedDates.size / totalDays) * 100);

  return {
    currentStreak,
    longestStreak,
    completionRate: Math.min(100, completionRate)
  };
}
