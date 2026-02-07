'use client';

import React from 'react';
import { useAuth, useLanguage, useTheme } from '../../context/AppContext';
import { User, Language } from '../../types';

interface DashboardHeaderProps {
  user: User | null;
  language: string;
  theme: string;
  onLanguageChange: (lang: Language) => void;
  onThemeToggle: () => void;
  onLogout: () => void;
  t: (key: string) => string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  user,
  language,
  theme,
  onLanguageChange,
  onThemeToggle,
  onLogout,
  t
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-xl text-white shadow-lg shadow-primary/20">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight hidden sm:block">{t('appName')}</h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Lang Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${language === 'en' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'opacity-50'}`}
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('vi')}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${language === 'vi' ? 'bg-white dark:bg-slate-700 shadow-sm' : 'opacity-50'}`}
            >
              VN
            </button>
          </div>

          {/* Theme toggle */}
          <button onClick={onThemeToggle} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:scale-105 transition-transform">
            {theme === 'light' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            )}
          </button>

          {/* User Profile */}
          <div className="group relative">
            <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold leading-none">{user?.name}</p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{t('level')} {user?.level}</p>
              </div>
              <img className="size-9 rounded-xl object-cover ring-2 ring-primary/10" src={user?.avatar} alt="User" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <button onClick={onLogout} className="w-full text-left px-5 py-3 text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors">
                {t('logout')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
