
import React, { useState, useMemo } from 'react';
import { useHabits } from '../context/HabitContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import HabitHeatmap from '../components/HabitHeatmap';
import HabitModal from '../components/HabitModal';
import { calculateStats } from '../utils/streak';
import { Habit } from '../types';

const Dashboard: React.FC = () => {
  const { habits, toggleHabitLog } = useHabits();
  const { user, logout } = useAuth();
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(habits[0]?.id || null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | undefined>(undefined);

  const selectedHabit = habits.find(h => h.id === selectedHabitId) || habits[0];
  const stats = useMemo(() => selectedHabit ? calculateStats(selectedHabit) : null, [selectedHabit, habits]);

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

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl text-white shadow-lg shadow-primary/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight hidden sm:block">{t('appName')}</h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Lang Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${language === 'en' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'opacity-50'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('vi')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${language === 'vi' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'opacity-50'}`}
              >
                VN
              </button>
            </div>

            {/* Theme toggle */}
            <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:scale-105 transition-transform">
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              )}
            </button>

            {/* User Profile */}
            <div className="group relative">
              <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                {/* <div className="text-right hidden md:block">
                  <p className="text-sm font-bold leading-none">{user?.name}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{t('level')} {user?.level}</p>
                </div> */}
                <img className="size-9 rounded-xl object-cover ring-2 ring-primary/10" src={user?.avatar} alt="User" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <button onClick={logout} className="w-full text-left px-5 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors">
                  {t('logout')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: Habit List */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-extrabold">{t('todaysHabits')}</h3>
              <button onClick={handleAddNew} className="text-primary p-1.5 hover:bg-primary/10 rounded-xl transition-colors">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </button>
            </div>

            <div className="space-y-4">
              {habits.length === 0 ? (
                <div className="p-10 text-center bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                  <p className="text-slate-500 font-medium mb-4">{t('noHabits')}</p>
                  <button onClick={handleAddNew} className="text-sm font-bold text-primary hover:underline">{t('newHabit')}</button>
                </div>
              ) : (
                habits.map(habit => {
                  const isSel = selectedHabitId === habit.id;
                  const isDone = isCheckedToday(habit);
                  const hStats = calculateStats(habit);

                  return (
                    <div
                      key={habit.id}
                      onClick={() => setSelectedHabitId(habit.id)}
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
                        onClick={(e) => { e.stopPropagation(); toggleHabitLog(habit.id, todayStr); }}
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

          {/* Right: Habit Detail */}
          <section className="lg:col-span-8">
            {selectedHabit ? (
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-10 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-10">
                  <div className="flex-1">
                    <span className="text-xs font-black uppercase tracking-widest text-primary mb-3 block" style={{ color: selectedHabit.color }}>{t('habitAnalytics')}</span>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight mb-3">{selectedHabit.name}</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">{selectedHabit.description || 'No description provided.'}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(selectedHabit)}
                      className="px-6 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      {t('editHabit')}
                    </button>
                    <button className="p-2.5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                    </button>
                  </div>
                </div>

                <div className="mb-12">
                  <HabitHeatmap habit={selectedHabit} color={selectedHabit.color} />
                </div>

                <div>
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8">Metrics Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Current Streak Card */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 group hover:border-primary/20 transition-colors" style={{ '--hover-color': selectedHabit.color } as any}>
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
                        <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${stats?.completionRate}%`, backgroundColor: selectedHabit.color }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-14 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border-l-8 border-primary italic text-slate-600 dark:text-slate-400 text-lg leading-relaxed shadow-sm" style={{ borderColor: selectedHabit.color }}>
                  "Discipline is the bridge between goals and accomplishment. Your small daily wins are building the foundation of your future self."
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-20 text-center opacity-40">
                <svg className="w-20 h-20 mb-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                <p className="text-xl font-bold">{t('noHabits')}</p>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 text-center text-slate-400 text-sm">
        <div className="flex justify-center gap-8 border-t border-slate-200 dark:border-slate-800 pt-10">
          <a href="#" className="hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]">Documentation</a>
          <a href="#" className="hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors font-bold uppercase tracking-widest text-[10px]">Help Center</a>
        </div>
        <p className="mt-6 font-medium opacity-60">© 2024 HabitPulse Inc. Engineered for consistency.</p>
      </footer>

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
