import React, { createContext, useContext, useState, useEffect } from 'react';
import { Habit } from '../types';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const API_BASE = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_URL) || 'http://localhost:3000';

interface HabitContextType {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'logs'>) => Promise<void> | void;
  updateHabit: (id: string, updates: Partial<Habit>) => Promise<void> | void;
  deleteHabit: (id: string) => Promise<void> | void;
  toggleHabitLog: (habitId: string, date: string) => Promise<void> | void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { toast: toastInfo, error: toastError } = useToast();

  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habits');
    if (!saved) return [];
    try {
      return JSON.parse(saved) as Habit[];
    } catch {
      localStorage.removeItem('habits');
      return [];
    }
  });

  // If user is logged-in (via API), fetch habits from backend. Otherwise keep localStorage-backed habits (guest)
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const token = localStorage.getItem('access_token');
      if (user && token) {
        try {
          const res = await fetch(`${API_BASE}/habits`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!res.ok) throw new Error('Failed to fetch habits');
          const data = await res.json();
          // map backend habit to frontend Habit
          const mapped: Habit[] = data.map((b: any) => ({
            id: b.id,
            name: b.name,
            description: b.description || '',
            frequency: b.frequency as any,
            startDate: b.start_date ? (new Date(b.start_date)).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            color: b.color || '#3B82F6',
            logs: (b.logs || []).map((l: any) => ({ date: (new Date(l.date)).toISOString().split('T')[0], completed: l.status === 'completed' })),
          }));
          if (mounted) setHabits(mapped);
        } catch (err) {
          console.error('Error loading habits from API', err);
          toastError('error');
        }
      } else {
        // guest or logged out: load from localStorage (already done in initial state)
      }
    };
    load();
    return () => { mounted = false; };
  }, [user]);

  // persist only for guest/local mode
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      localStorage.setItem('habits', JSON.stringify(habits));
    }
  }, [habits]);

  const addHabit = async (habitData: Omit<Habit, 'id' | 'logs'>) => {
    const token = localStorage.getItem('access_token');
    if (user && token) {
      try {
        const res = await fetch(`${API_BASE}/habits`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ name: habitData.name, frequency: habitData.frequency, start_date: habitData.startDate, color: habitData.color }),
        });
        if (!res.ok) throw new Error('Failed to create habit');
        const b = await res.json();
        const newHabit: Habit = {
          id: b.id,
          name: b.name,
          description: b.description || '',
          frequency: b.frequency as any,
          startDate: b.start_date ? (new Date(b.start_date)).toISOString().split('T')[0] : habitData.startDate,
          color: b.color || habitData.color,
          logs: (b.logs || []).map((l: any) => ({ date: (new Date(l.date)).toISOString().split('T')[0], completed: l.status === 'completed' })),
        };
        setHabits(prev => [newHabit, ...prev]);
  toastInfo('habitCreated');
      } catch (err) {
        console.error(err);
        toastError('error');
      }
    } else {
      const newHabit: Habit = {
        ...habitData,
        id: Math.random().toString(36).substr(2, 9),
        logs: []
      };
      setHabits(prev => [...prev, newHabit]);
    }
  };

  const updateHabit = async (id: string, updates: Partial<Habit>) => {
    const token = localStorage.getItem('access_token');
    if (user && token) {
      try {
        const res = await fetch(`${API_BASE}/habits/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ name: updates.name, description: updates.description, frequency: updates.frequency, start_date: updates.startDate, color: updates.color }),
        });
        if (!res.ok) throw new Error('Failed to update habit');
        const b = await res.json();
        const updated: Habit = {
          id: b.id,
          name: b.name,
          description: b.description || '',
          frequency: b.frequency as any,
          startDate: b.start_date ? (new Date(b.start_date)).toISOString().split('T')[0] : updates.startDate || '',
          color: b.color || '#3B82F6',
          logs: (b.logs || []).map((l: any) => ({ date: (new Date(l.date)).toISOString().split('T')[0], completed: l.status === 'completed' })),
        };
        setHabits(prev => prev.map(h => h.id === id ? updated : h));
      } catch (err) {
        console.error(err);
        toastError('error');
      }
    } else {
      setHabits(prev => prev.map(h => h.id === id ? { ...h, ...updates } : h));
    }
  };

  const deleteHabit = async (id: string) => {
    const token = localStorage.getItem('access_token');
    if (user && token) {
      try {
        const res = await fetch(`${API_BASE}/habits/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to delete habit');
        setHabits(prev => prev.filter(h => h.id !== id));
      } catch (err) {
        console.error(err);
        toastError('error');
      }
    } else {
      setHabits(prev => prev.filter(h => h.id !== id));
    }
  };

  const toggleHabitLog = async (habitId: string, date: string) => {
    const token = localStorage.getItem('access_token');
    if (user && token) {
      try {
        // Check existing logs for the habit
        const logsRes = await fetch(`${API_BASE}/habits/${habitId}/logs`, { headers: { Authorization: `Bearer ${token}` } });
        if (!logsRes.ok) throw new Error('Failed to fetch habit logs');
        const logs = await logsRes.json();
        const exists = logs.some((l: any) => (new Date(l.date)).toISOString().split('T')[0] === date);
        if (exists) {
          // delete
          const del = await fetch(`${API_BASE}/habits/${habitId}/logs?date=${date}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
          if (!del.ok) throw new Error('Failed to delete log');
        } else {
          const checkin = await fetch(`${API_BASE}/habits/${habitId}/logs/checkin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            body: JSON.stringify({ date }),
          });
          if (!checkin.ok) throw new Error('Failed to create log');
        }
        // refresh habits
        const res = await fetch(`${API_BASE}/habits`, { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) throw new Error('Failed to fetch habits');
        const data = await res.json();
        const mapped: Habit[] = data.map((b: any) => ({
          id: b.id,
          name: b.name,
          description: b.description || '',
          frequency: b.frequency as any,
          startDate: b.start_date ? (new Date(b.start_date)).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          color: b.color || '#3B82F6',
          logs: (b.logs || []).map((l: any) => ({ date: (new Date(l.date)).toISOString().split('T')[0], completed: l.status === 'completed' })),
        }));
        setHabits(mapped);
      } catch (err) {
        console.error(err);
        toastError('error');
      }
    } else {
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
    }
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit, updateHabit, deleteHabit, toggleHabitLog }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const ctx = useContext(HabitContext);
  if (!ctx) throw new Error('useHabits must be used within HabitProvider');
  return ctx;
};
