'use client';

import React from 'react';
import { ThemeProvider, LanguageProvider, AuthProvider, HabitsProvider, ToastProvider } from './providers';

interface AppContextType {
  // This will be a combination of all provider contexts
  // Individual hooks should be used instead for better performance
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <HabitsProvider>
            <ToastProvider>
              <AppContext.Provider value={{}}>
                {children}
              </AppContext.Provider>
            </ToastProvider>
          </HabitsProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

// Legacy hook for backward compatibility - prefer using individual hooks
export const useApp = () => {
  const context = React.useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// Re-export individual hooks for better performance and maintainability
export {
  useTheme,
  useLanguage,
  useAuth,
  useHabits
} from './providers';
