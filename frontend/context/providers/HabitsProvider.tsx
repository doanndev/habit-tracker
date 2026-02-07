'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Habit, HabitLog } from '../../types';
import toast from 'react-hot-toast';
import { useAuth } from './AuthProvider';

interface HabitsContextType {
  habits: Habit[];
  fetchHabits: () => Promise<void>;
  addHabit: (habit: Omit<Habit, 'id' | 'logs'>) => Promise<void>;
  updateHabit: (id: string, updates: Partial<Habit>) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  toggleHabitLog: (habitId: string, date: string) => Promise<void>;
}

const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

export const HabitsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const { refreshToken } = useAuth();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  // Helper function to make authenticated API calls with automatic token refresh
  const makeAuthenticatedRequest = useCallback(async (url: string, options: RequestInit = {}) => {
    let token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No access token found');
    }

    console.log('makeAuthenticatedRequest(): initial token (first 20 chars):', token.slice(0, 20));

    let headers = {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };

    console.log('Making authenticated request to:', url, 'with token present:', !!token);
    let response = await fetch(url, { ...options, headers });
    console.log('Initial response status:', response.status);

    // If we get a 401, try to refresh the token
    if (response.status === 401) {
      console.log('Got 401, attempting token refresh...');
      const newToken = await refreshToken();
      console.log('Refresh result:', newToken ? 'success' : 'failed');
      if (newToken) {
        // Retry the request with the new token (use token returned from refresh)
        token = newToken;
        console.log('makeAuthenticatedRequest(): new token (first 20 chars):', token.slice(0, 20));
        const newHeaders = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        } as Record<string, string>;
        console.log('Retrying request with new token...');
        response = await fetch(url, { ...options, headers: newHeaders });
        console.log('Retry response status:', response.status);
      }
    }

    return response;
  }, [refreshToken]);

  // Helper function to get auth headers
  const getAuthHeaders = (includeContentType = false) => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No access token found');
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    if (includeContentType) {
      headers['Content-Type'] = 'application/json';
    }

    return headers;
  };

  const fetchHabits = useCallback(async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        console.log('fetchHabits: No access token, skipping fetch');
        return;
      }

      const response = await makeAuthenticatedRequest(`${API_URL}/habits`);

      if (response.status === 401) {
        // makeAuthenticatedRequest đã thử refresh token nhưng vẫn thất bại
        // Chỉ xóa tokens khi refresh token cũng hết hạn
        const refreshTokenValue = localStorage.getItem('refresh_token');
        if (!refreshTokenValue) {
          // Không có refresh token → đã logout hoặc chưa login
          console.log('fetchHabits: No refresh token, user not logged in');
          return;
        }
        // Có refresh token nhưng vẫn 401 → refresh token hết hạn
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        toast.error('Session expired. Please login again.');
        return;
      }

      if (response.ok) {
        const habitsData = await response.json();
        const transformedHabits = habitsData.map((habit: any) => ({
          ...habit,
          startDate: habit.start_date,
          logs: habit.logs || [],
        }));
        setHabits(transformedHabits);
      } else {
        toast.error('Failed to fetch habits');
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'No access token found') {
        console.log('fetchHabits: No access token found in makeAuthenticatedRequest');
      } else {
        console.error('Fetch habits error:', error);
        toast.error('Failed to fetch habits');
      }
    }
  }, [API_URL, makeAuthenticatedRequest]);

  const addHabit = useCallback(async (habitData: Omit<Habit, 'id' | 'logs'>) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        toast.error('Please login to create habits');
        return;
      }

      const response = await makeAuthenticatedRequest(`${API_URL}/habits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(habitData),
      });

      if (response.status === 401) {
        // makeAuthenticatedRequest đã thử refresh token nhưng vẫn thất bại
        const refreshTokenValue = localStorage.getItem('refresh_token');
        if (!refreshTokenValue) {
          toast.error('Please login to continue.');
          return;
        }
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        toast.error('Session expired. Please login again.');
        return;
      }

      if (response.ok) {
        await fetchHabits();
        toast.success('Habit created successfully! 🎯');
      } else {
        toast.error('Failed to create habit');
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'No access token found') {
        toast.error('Please login to create habits');
      } else {
        console.error('Add habit error:', error);
        toast.error('Failed to create habit');
      }
    }
  }, [API_URL, fetchHabits, makeAuthenticatedRequest]);

  const updateHabit = useCallback(async (id: string, updates: Partial<Habit>) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        toast.error('Please login to update habits');
        return;
      }

      const response = await makeAuthenticatedRequest(`${API_URL}/habits/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (response.status === 401) {
        // makeAuthenticatedRequest đã thử refresh token nhưng vẫn thất bại
        const refreshTokenValue = localStorage.getItem('refresh_token');
        if (!refreshTokenValue) {
          toast.error('Please login to continue.');
          return;
        }
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        toast.error('Session expired. Please login again.');
        return;
      }

      if (response.ok) {
        await fetchHabits();
        toast.success('Habit updated successfully! ✨');
      } else {
        toast.error('Failed to update habit');
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'No access token found') {
        toast.error('Please login to update habits');
      } else {
        console.error('Update habit error:', error);
        toast.error('Failed to update habit');
      }
    }
  }, [API_URL, fetchHabits, makeAuthenticatedRequest]);

  const deleteHabit = useCallback(async (id: string) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        toast.error('Please login to delete habits');
        return;
      }

      const response = await makeAuthenticatedRequest(`${API_URL}/habits/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 401) {
        // makeAuthenticatedRequest đã thử refresh token nhưng vẫn thất bại
        const refreshTokenValue = localStorage.getItem('refresh_token');
        if (!refreshTokenValue) {
          toast.error('Please login to continue.');
          return;
        }
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        toast.error('Session expired. Please login again.');
        return;
      }

      if (response.ok) {
        await fetchHabits();
        toast.success('Habit deleted successfully 🗑️');
      } else {
        toast.error('Failed to delete habit');
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'No access token found') {
        toast.error('Please login to delete habits');
      } else {
        console.error('Delete habit error:', error);
        toast.error('Failed to delete habit');
      }
    }
  }, [API_URL, fetchHabits, makeAuthenticatedRequest]);

  const toggleHabitLog = useCallback(async (habitId: string, date: string) => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        toast.error('Please login to log habits');
        return;
      }

      const response = await makeAuthenticatedRequest(`${API_URL}/habits/${habitId}/logs/checkin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date }),
      });

      if (response.status === 401) {
        // makeAuthenticatedRequest đã thử refresh token nhưng vẫn thất bại
        const refreshTokenValue = localStorage.getItem('refresh_token');
        if (!refreshTokenValue) {
          toast.error('Please login to continue.');
          return;
        }
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        toast.error('Session expired. Please login again.');
        return;
      }

      if (response.ok) {
        await fetchHabits();
        toast.success('Habit logged! ✅');
      } else {
        toast.error('Failed to log habit');
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'No access token found') {
        toast.error('Please login to log habits');
      } else {
        console.error('Toggle habit log error:', error);
        toast.error('Failed to log habit');
      }
    }
  }, [API_URL, fetchHabits, makeAuthenticatedRequest]); return (
    <HabitsContext.Provider value={{
      habits,
      fetchHabits,
      addHabit,
      updateHabit,
      deleteHabit,
      toggleHabitLog
    }}>
      {children}
    </HabitsContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitsContext);
  // Return default values during static generation when context is not available
  if (!context) {
    return {
      habits: [],
      fetchHabits: () => Promise.resolve(),
      addHabit: () => Promise.resolve(),
      updateHabit: () => Promise.resolve(),
      deleteHabit: () => Promise.resolve(),
      toggleHabitLog: () => Promise.resolve(),
    };
  }
  return context;
};
