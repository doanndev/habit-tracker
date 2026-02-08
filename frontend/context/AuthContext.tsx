import React, { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';
import { User } from '../types';

const API_BASE = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_URL) || 'http://localhost:3000';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void> | void;
  loginAsGuest: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    if (!saved) return null;
    try {
      return JSON.parse(saved) as User;
    } catch {
      localStorage.removeItem('user');
      return null;
    }
  });

  const { success, toast: toastInfo, error: toastError } = useToast();

  const login = async (email: string, pass: string) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || 'Login failed');
      }
      const data = await res.json();
      const { access_token, refresh_token } = data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      // decode JWT payload to get user id/email
      try {
        const payload = JSON.parse(atob(access_token.split('.')[1]));
        const newUser: User = {
          id: payload.sub || payload.userId || payload.sub,
          email: payload.email || email,
          name: (payload.email || email).split('@')[0],
          avatar: 'https://picsum.photos/seed/alex/100/100',
          level: 1,
        } as any;
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
      } catch (e) {
        // fallback
        const newUser: User = { id: 'unknown', email, name: email.split('@')[0], avatar: 'https://picsum.photos/seed/alex/100/100', level: 1 } as any;
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
      }

      success('loginSuccess');
    } catch (err: any) {
      console.error('Login error', err);
      toastError('error');
      throw err;
    }
  };

  const loginAsGuest = () => {
    const guest: User = {
      email: 'guest@example.com',
      avatar: 'https://picsum.photos/seed/guest/100/100',
      level: 1
    };
    setUser(guest);
    localStorage.setItem('user', JSON.stringify(guest));
    toastInfo('loginGuest', { icon: '👤' });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toastInfo('logoutSuccess', { icon: '👋' });
  };

  return (
    <AuthContext.Provider value={{ user, login, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
