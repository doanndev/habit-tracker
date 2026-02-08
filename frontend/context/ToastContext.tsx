import React, { createContext, useContext } from 'react';
import { Toaster, toast as baseToast, ToastOptions } from 'react-hot-toast';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';

interface ToastContextType {
  toast: (key: string, options?: ToastOptions) => void;
  success: (key: string, options?: ToastOptions) => void;
  error: (key: string, options?: ToastOptions) => void;
  info: (key: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  // Rendered component so it re-renders when language changes
  const ToastMessage: React.FC<{ k: string }> = ({ k }) => {
    const { t: localT } = useLanguage();
    return <div>{localT(k)}</div>;
  };

  const { theme } = useTheme();

  const toast = (key: string, options?: ToastOptions) => baseToast(<ToastMessage k={key} />, options);
  const success = (key: string, options?: ToastOptions) => baseToast.success(<ToastMessage k={key} />, options);
  const error = (key: string, options?: ToastOptions) => baseToast.error(<ToastMessage k={key} />, options);
  const info = (key: string, options?: ToastOptions) => baseToast(<ToastMessage k={key} />, { icon: 'ℹ️', ...options });

  return (
    <ToastContext.Provider value={{ toast, success, error, info }}>
      {children}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: theme === 'dark' ? '#0b1220' : '#fff',
            color: theme === 'dark' ? '#e6eef8' : '#222',
            boxShadow: theme === 'dark' ? '0 6px 30px rgba(2,6,23,0.6)' : '0 4px 24px 0 rgba(0,0,0,0.10)',
            fontWeight: 500,
            fontSize: 15,
            padding: '12px 16px',
            minWidth: 220,
            maxWidth: 360,
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
            style: {
              background: theme === 'dark' ? '#052e23' : '#ecfdf5',
              color: theme === 'dark' ? '#9ff3c7' : '#065f46',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
            style: {
              background: theme === 'dark' ? '#2b0b0b' : '#fef2f2',
              color: theme === 'dark' ? '#ffb4b4' : '#991b1b',
            },
          },
        }}
        gutter={12}
        containerStyle={{
          top: 24,
          right: 24,
        }}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};
