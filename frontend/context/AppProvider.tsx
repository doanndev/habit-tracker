import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { LanguageProvider } from './LanguageContext';
import { AuthProvider } from './AuthContext';
import { HabitProvider } from './HabitContext';
import { ToastProvider } from './ToastContext';


const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <LanguageProvider>
      <ToastProvider>
        <AuthProvider>
          <HabitProvider>
            {children}
          </HabitProvider>
        </AuthProvider>
      </ToastProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default AppProvider;
