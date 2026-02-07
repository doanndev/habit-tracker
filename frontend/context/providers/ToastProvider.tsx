'use client';

import React from 'react';
import { Toaster } from 'react-hot-toast';

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          className: 'toast-enter toast-glass',
          style: {
            background: 'hsl(var(--card) / 0.85)',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border) / 0.5)',
            borderRadius: '20px',
            boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15), 0 0 0 1px rgb(255 255 255 / 0.1), inset 0 1px 0 rgb(255 255 255 / 0.1)',
            fontSize: '14px',
            fontWeight: '500',
            padding: '20px 26px',
            maxWidth: '420px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            position: 'relative',
            overflow: 'hidden',
          },
          success: {
            style: {
              background: 'hsl(var(--card) / 0.9)',
              color: 'hsl(var(--card-foreground))',
              border: '1px solid hsl(142 76% 36% / 0.3)',
              borderLeft: '3px solid hsl(142 76% 36%)',
              boxShadow: '0 25px 50px -12px rgb(34 197 94 / 0.12), 0 0 0 1px rgb(255 255 255 / 0.15), inset 0 1px 0 rgb(255 255 255 / 0.2)',
              backgroundImage: 'linear-gradient(135deg, hsl(142 76% 36% / 0.08) 0%, transparent 70%)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            },
            iconTheme: {
              primary: 'hsl(142 76% 36%)',
              secondary: 'hsl(var(--card))',
            },
          },
          error: {
            style: {
              background: 'hsl(var(--card) / 0.9)',
              color: 'hsl(var(--card-foreground))',
              border: '1px solid hsl(0 84% 60% / 0.3)',
              borderLeft: '3px solid hsl(0 84% 60%)',
              boxShadow: '0 25px 50px -12px rgb(239 68 68 / 0.12), 0 0 0 1px rgb(255 255 255 / 0.15), inset 0 1px 0 rgb(255 255 255 / 0.2)',
              backgroundImage: 'linear-gradient(135deg, hsl(0 84% 60% / 0.08) 0%, transparent 70%)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            },
            iconTheme: {
              primary: 'hsl(0 84% 60%)',
              secondary: 'hsl(var(--card))',
            },
          },
          loading: {
            style: {
              background: 'hsl(var(--card) / 0.9)',
              color: 'hsl(var(--card-foreground))',
              border: '1px solid hsl(var(--border) / 0.5)',
              borderLeft: '3px solid hsl(var(--primary))',
              boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15), 0 0 0 1px rgb(255 255 255 / 0.15), inset 0 1px 0 rgb(255 255 255 / 0.2)',
              backgroundImage: 'linear-gradient(135deg, hsl(var(--primary) / 0.08) 0%, transparent 70%)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            },
            iconTheme: {
              primary: 'hsl(var(--primary))',
              secondary: 'hsl(var(--card))',
            },
          },
        }}
        containerStyle={{
          top: 24,
          right: 24,
          zIndex: 9999,
        }}
        gutter={12}
      />
    </>
  );
};
