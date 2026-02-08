
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Theme, Language, Habit, HabitLog } from '../types';
import { TRANSLATIONS } from '../constants';

interface AppContextType {
  user: User | null;
  theme: Theme;
  language: Language;
  habits: Habit[];
  t: (key: string) => string;
  login: (email: string, pass: string) => void;
  loginAsGuest: () => void;
  logout: () => void;
  toggleTheme: () => void;
  setLanguage: (lang: Language) => void;
  addHabit: (habit: Omit<Habit, 'id' | 'logs'>) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  toggleHabitLog: (habitId: string, date: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light');
  const [language, setLanguageState] = useState<Language>(() => (localStorage.getItem('lang') as Language) || 'en');
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist habits
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  // Handle Theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  // Handle Language
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('lang', lang);
  };

  const t = useCallback((key: string) => {
    return TRANSLATIONS[language][key] || key;
  }, [language]);

  // Auth logic
  const login = (email: string, pass: string) => {
    const newUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      avatar: 'https://picsum.photos/seed/alex/100/100',
      level: 24
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const loginAsGuest = () => {
    const guest: User = {
      id: 'guest',
      email: 'guest@example.com',
      name: 'Guest User',
      avatar: 'https://picsum.photos/seed/guest/100/100',
      level: 1
    };
    setUser(guest);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Habit CRUD
  const addHabit = (habitData: Omit<Habit, 'id' | 'logs'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: Math.random().toString(36).substr(2, 9),
      logs: []
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, ...updates } : h));
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  const toggleHabitLog = (habitId: string, date: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id !== habitId) return habit;
      
      const existingLog = habit.logs.find(l => l.date === date);
      let newLogs;
      if (existingLog) {
        newLogs = habit.logs.filter(l => l.date !== date);
      } else {
        newLogs = [...habit.logs, { date, completed: true }];
      }
      return { ...habit, logs: newLogs };
    }));
  };

  return (
    <AppContext.Provider value={{
      user, theme, language, habits, t,
      login, loginAsGuest, logout, toggleTheme, setLanguage,
      addHabit, updateHabit, deleteHabit, toggleHabitLog
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
