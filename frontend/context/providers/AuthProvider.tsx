'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '../../types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (email: string, pass: string) => Promise<void>;
  loginAsGuest: () => void;
  logout: () => void;
  // returns the new access token string when successful, otherwise null
  refreshToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  // avoid concurrent refresh calls
  const refreshPromiseRef = React.useRef<Promise<string | null> | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = useCallback(async (email: string, pass: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      const newUser: User = {
        email,
        name: email.split('@')[0],
        avatar: 'https://picsum.photos/seed/alex/100/100',
        level: 24
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success('Welcome back! ');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  const register = useCallback(async (email: string, pass: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });

      if (!response.ok) throw new Error('Registration failed');

      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      const newUser: User = {
        email,
        name: email.split('@')[0],
        avatar: 'https://picsum.photos/seed/alex/100/100',
        level: 1
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      toast.success('Account created successfully! 🎉');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  const refreshToken = useCallback(async (): Promise<string | null> => {
    // If a refresh is already in progress, return the same promise so callers wait on it.
    if (refreshPromiseRef.current) return refreshPromiseRef.current;

    const promise = (async () => {
      try {
        const refreshTokenValue = localStorage.getItem('refresh_token');
        if (!refreshTokenValue) {
          return null;
        }

        const response = await fetch(`${API_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshTokenValue }),
        });

        if (!response.ok) {
          return null;
        }

        const data = await response.json();
        // persist new access token and return it
        localStorage.setItem('access_token', data.access_token);
        return data.access_token as string;
      } catch (error) {
        console.error('Refresh token error:', error);
        return null;
      } finally {
        // clear the ref so future refreshes can run
        refreshPromiseRef.current = null;
      }
    })();

    refreshPromiseRef.current = promise;
    return promise;
  }, [API_URL]);

  const loginAsGuest = useCallback(() => {
    const guest: User = {
      email: 'guest@example.com',
      name: 'Guest User',
      avatar: 'https://picsum.photos/seed/guest/100/100',
      level: 1
    };
    setUser(guest);
    toast.success('Welcome, Guest! 👋');
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    toast.success('Logged out successfully');
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginAsGuest, logout, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  // Return default values during static generation when context is not available
  if (!context) {
    return {
      user: null,
      login: () => {},
      register: () => {},
      loginAsGuest: () => {},
      logout: () => {},
      refreshToken: () => Promise.resolve(null),
      loading: true,
    };
  }
  return context;
};
