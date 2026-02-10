import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { LanguageProvider } from './LanguageContext';
import { AuthProvider } from './AuthContext';
import { HabitProvider } from './HabitContext';
import { ToastProvider } from './ToastContext';
import { GoogleOAuthProvider } from '@react-oauth/google';


const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ThemeProvider>
    <LanguageProvider>
      <ToastProvider>
        <AuthProvider>
          <HabitProvider>
            <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID || "122636462688-uq7hki3o1ic8dpd8o1940iei97ofv5ok.apps.googleusercontent.com"}>
            {children}
            </GoogleOAuthProvider>
          </HabitProvider>
        </AuthProvider>
      </ToastProvider>
    </LanguageProvider>
  </ThemeProvider>
);

export default AppProvider;
