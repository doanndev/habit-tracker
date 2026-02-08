
import React from 'react';
import { Habit } from '../types';

interface HeatmapProps {
  habit: Habit;
  color: string;
}

const HabitHeatmap: React.FC<HeatmapProps> = ({ habit, color }) => {
  const today = new Date();
  const daysToShow = 140; // Approx 20 weeks
  const completedDates = new Set(habit.logs.map(l => l.date));

  const generateDays = () => {
    const days = [];
    for (let i = daysToShow - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      days.push({
        date: dateStr,
        isCompleted: completedDates.has(dateStr),
        dayOfWeek: d.getDay()
      });
    }
    return days;
  };

  const days = generateDays();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
        <span>Activity History</span>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <div className="flex gap-1">
            {[0.1, 0.3, 0.6, 1].map(op => (
              <div 
                key={op} 
                className="w-3 h-3 rounded-sm" 
                style={{ backgroundColor: color, opacity: op }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
      
      <div className="hide-scrollbar overflow-x-auto">
        <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-max">
          {days.map((day, idx) => (
            <div
              key={idx}
              title={day.date}
              className={`w-3 h-3 rounded-sm transition-all duration-300 ${
                day.isCompleted ? '' : 'bg-slate-100 dark:bg-slate-800'
              }`}
              style={{
                backgroundColor: day.isCompleted ? color : undefined,
                boxShadow: day.isCompleted ? `0 0 6px ${color}44` : 'none'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HabitHeatmap;
