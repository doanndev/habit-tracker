
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useHabits } from '../context/HabitContext';
// Fix: Import Habit from '../types' instead of '../constants'
import { HABIT_COLORS } from '../constants';
import { Habit, Frequency } from '../types';

interface HabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  editHabit?: Habit;
}

const HabitModal: React.FC<HabitModalProps> = ({ isOpen, onClose, editHabit }) => {
  const { t } = useLanguage();
  const { addHabit, updateHabit, isAddingHabit, isUpdatingHabit } = useHabits();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<Frequency>('daily');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [color, setColor] = useState(HABIT_COLORS[0]);

  useEffect(() => {
    if (editHabit) {
      setName(editHabit.name);
      setDescription(editHabit.description);
      setFrequency(editHabit.frequency);
      setStartDate(editHabit.startDate);
      setColor(editHabit.color);
    } else {
      setName('');
      setDescription('');
      setFrequency('daily');
      setStartDate(new Date().toISOString().split('T')[0]);
      setColor(HABIT_COLORS[0]);
    }
  }, [editHabit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editHabit) {
      updateHabit(editHabit.id, { name, description, frequency, startDate, color });
    } else {
      addHabit({ name, description, frequency, startDate, color });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col scale-in-center">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold">{editHabit ? t('editHabit') : t('newHabit')}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="space-y-2">
            <label className="text-sm font-semibold">{t('habitNameLabel')}</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Morning Meditation"
              className="w-full h-12 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description..."
              className="w-full rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-3 min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">{t('frequencyLabel')}</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as Frequency)}
                className="w-full h-12 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">{t('startDateLabel')}</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full h-12 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold">{t('chooseColor')}</label>
            <div className="flex flex-wrap gap-3">
              {HABIT_COLORS.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-full transition-all ${color === c ? 'ring-2 ring-offset-2 ring-primary scale-110' : 'hover:scale-105'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </form>

        <div className="px-8 py-6 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
          <button type="button" onClick={onClose} className="px-6 py-2.5 font-semibold text-slate-500 hover:text-slate-700 transition-colors">
            {t('cancel')}
          </button>
          <button type="submit" onClick={handleSubmit} disabled={isAddingHabit || isUpdatingHabit} className="px-8 py-2.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
            {(isAddingHabit || isUpdatingHabit) ? (
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              t('saveHabit')
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitModal;
