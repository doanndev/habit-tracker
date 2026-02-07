'use client';

import React, { useState, useEffect } from 'react';
import { useHabits, useAuth, useLanguage, useTheme } from '../context/AppContext';
import HabitModal from '../components/HabitModal';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import HabitList from '../components/dashboard/HabitList';
import HabitDetail from '../components/dashboard/HabitDetail';
import DashboardFooter from '../components/dashboard/DashboardFooter';
import { Habit } from '../types';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

const Dashboard: React.FC = () => {
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>(undefined);
  const [habitsLoaded, setHabitsLoaded] = useState(false);

  // Always call hooks in the same order - never conditionally
  const { habits, toggleHabitLog, fetchHabits } = useHabits();
  const { user, logout, loading } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (user && !habitsLoaded) {
      fetchHabits();
      setHabitsLoaded(true);
    } else if (!user) {
      setHabitsLoaded(false);
    }
  }, [user, habitsLoaded, fetchHabits]);

  // Update selectedHabitId when habits change
  useEffect(() => {
    if (habits.length > 0 && !selectedHabitId) {
      setSelectedHabitId(habits[0].id);
    }
  }, [habits, selectedHabitId]);

  // Show loading state while auth is loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const selectedHabit = habits.find((h: Habit) => h.id === selectedHabitId) || habits[0];

  const todayStr = new Date().toISOString().split('T')[0];
  const isCheckedToday = (habit: Habit) => habit.logs.some(l => l.date === todayStr && l.completed);

  const handleEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingHabit(undefined);
    setIsModalOpen(true);
  };

  const handleToggleLog = async (habitId: string, date: string) => {
    try {
      await toggleHabitLog(habitId, date);
    } catch (err) {
      // Error is handled by toast in HabitsProvider
    }
  };

  if (loading && habits.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-500">Loading your habits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      <DashboardHeader
        user={user}
        language={language}
        theme={theme}
        t={t}
        onLanguageChange={setLanguage}
        onThemeToggle={toggleTheme}
        onLogout={logout}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <HabitList
            habits={habits}
            selectedHabitId={selectedHabitId}
            t={t}
            onHabitSelect={setSelectedHabitId}
            onAddNew={handleAddNew}
            onToggleLog={handleToggleLog}
          />

          {selectedHabit ? (
            <HabitDetail
              habit={selectedHabit}
              onEdit={handleEdit}
              t={t}
            />
          ) : (
            <section className="lg:col-span-8">
              <div className="h-full flex flex-col items-center justify-center p-20 text-center opacity-40">
                <svg className="w-20 h-20 mb-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                <p className="text-xl font-bold">{t('noHabits')}</p>
              </div>
            </section>
          )}
        </div>
      </main>

      <DashboardFooter t={t} />

      {/* Habit Modal */}
      <HabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editHabit={editingHabit}
      />
    </div>
  );
};

export default Dashboard;
