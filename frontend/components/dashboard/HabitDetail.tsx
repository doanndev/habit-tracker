'use client';

import React from 'react';
import { Habit } from '../../types';
import HabitHeatmap from '../HabitHeatmap';
import { calculateStats } from '../../utils/streak';

interface HabitDetailProps {
  habit: Habit;
  onEdit: (habit: Habit) => void;
  t: (key: string) => string;
}

const HabitDetail: React.FC<HabitDetailProps> = ({ habit, onEdit, t }) => {
  const stats = calculateStats(habit);

  return (
    <section className="lg:col-span-8">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-10 animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-10">
          <div className="flex-1">
            <span className="text-xs font-black uppercase tracking-widest text-primary mb-3 block" style={{ color: habit.color }}>{t('habitAnalytics')}</span>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight mb-3">{habit.name}</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">{habit.description || 'No description provided.'}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onEdit(habit)}
              className="px-6 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {t('editHabit')}
            </button>
            <button className="p-2.5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="mb-12">
          <HabitHeatmap habit={habit} color={habit.color} />
        </div>

        <div>
          <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8">Metrics Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current Streak Card */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 group hover:border-primary/20 transition-colors" style={{ '--hover-color': habit.color } as any}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-orange-500 drop-shadow-sm font-bold">🔥</span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 group-hover:text-primary transition-colors">{t('currentStreak')}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-slate-900 dark:text-white">{stats?.currentStreak}</span>
                <span className="text-slate-500 font-bold">days</span>
              </div>
              <p className="text-[10px] font-black uppercase text-slate-400 mt-4 tracking-tighter">Keep it up!</p>
            </div>

            {/* Longest Streak Card */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-amber-500">🏆</span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">{t('longestStreak')}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-slate-900 dark:text-white">{stats?.longestStreak}</span>
                <span className="text-slate-500 font-bold">days</span>
              </div>
              <p className="text-[10px] font-black uppercase text-slate-400 mt-4 tracking-tighter">Your record</p>
            </div>

            {/* Completion Rate Card */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-primary">📊</span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">{t('completionRate')}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-slate-900 dark:text-white">{stats?.completionRate}</span>
                <span className="text-slate-500 font-bold">%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full mt-6 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${stats?.completionRate}%`, backgroundColor: habit.color }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border-l-8 border-primary italic text-slate-600 dark:text-slate-400 text-lg leading-relaxed shadow-sm" style={{ borderColor: habit.color }}>
          "Discipline is the bridge between goals and accomplishment. Your small daily wins are building the foundation of your future self."
        </div>
      </div>
    </section>
  );
};

export default HabitDetail;
