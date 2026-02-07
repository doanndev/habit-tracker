'use client';

import React from 'react';
import { Habit } from '../../types';
import { calculateStats } from '../../utils/streak';

interface HabitListProps {
  habits: Habit[];
  selectedHabitId: string | null;
  onHabitSelect: (habitId: string) => void;
  onAddNew: () => void;
  onToggleLog: (habitId: string, date: string) => void;
  t: (key: string) => string;
}

const HabitList: React.FC<HabitListProps> = ({
  habits,
  selectedHabitId,
  onHabitSelect,
  onAddNew,
  onToggleLog,
  t
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const isCheckedToday = (habit: Habit) => habit.logs.some(l => l.date === todayStr && l.completed);

  return (
    <aside className="lg:col-span-4 space-y-6">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-xl font-extrabold">{t('todaysHabits')}</h3>
        <button onClick={onAddNew} className="text-primary p-1.5 hover:bg-primary/10 rounded-xl transition-colors">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {habits.length === 0 ? (
          <div className="p-10 text-center bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 font-medium mb-4">{t('noHabits')}</p>
            <button onClick={onAddNew} className="text-sm font-bold text-primary hover:underline">{t('newHabit')}</button>
          </div>
        ) : (
          habits.map((habit: Habit) => {
            const isSel = selectedHabitId === habit.id;
            const isDone = isCheckedToday(habit);
            const hStats = calculateStats(habit);

            return (
              <div
                key={habit.id}
                onClick={() => onHabitSelect(habit.id)}
                className={`group cursor-pointer relative bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border-2 transition-all active:scale-[0.98] ${
                  isSel ? 'border-primary' : 'border-transparent hover:border-slate-200 dark:hover:border-slate-800'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-4">
                    <div className="size-3.5 rounded-full mt-1.5 transition-transform" style={{
                      backgroundColor: habit.color,
                      boxShadow: `0 0 10px ${habit.color}66`
                    }}></div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{habit.name}</h4>
                      <p className="text-sm font-medium text-slate-500 mt-0.5 flex items-center gap-1.5">
                        <span className="text-orange-500 drop-shadow-sm">🔥</span> {hStats.currentStreak} days streak
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); onToggleLog(habit.id, todayStr); }}
                  className={`w-full font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                    isDone
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {isDone && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>}
                  <span>{isDone ? 'Completed' : t('checkIn')}</span>
                </button>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};

export default HabitList;
