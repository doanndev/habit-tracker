'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../constants';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  // Load language from localStorage on client side
  useEffect(() => {
    const savedLanguage = localStorage.getItem('lang') as Language;
    if (savedLanguage) setLanguageState(savedLanguage);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('lang', lang);
  }, []);

  const t = useCallback((key: string) => {
    return TRANSLATIONS[language][key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  // Return default values during static generation when context is not available
  if (!context) {
    return {
      t: (key: string) => key,
      language: 'en',
      setLanguage: () => {},
    };
  }
  return context;
};
