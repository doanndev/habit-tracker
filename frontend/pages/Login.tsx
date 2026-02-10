
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Login: React.FC = () => {
  const { t } = useLanguage();
  const { login, loginAsGuest, isLoggingIn } = useAuth();
  const { toast: toastInfo, error: toastError } = useToast();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const API_BASE = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_URL) || 'http://localhost:3000';


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, pass);
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await fetch(`${API_BASE}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential })
      });
      if (!res.ok) throw new Error('Google login failed');
      const data = await res.json();
      if (data.access_token && data.refresh_token && data.user) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.reload();
      }
    } catch {
      toastError('Google login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background-light dark:bg-background-dark">
      <div className="w-full max-w-[440px] flex flex-col items-center">
        <div className="mb-8 text-center">
          <div className="size-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/30 mb-5 mx-auto">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">{t('appName')}</h1>
          <p className="text-slate-500 dark:text-slate-400">{t('loginSubtitle')}</p>
        </div>

        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('emailLabel')}</label>
              <input
                type="email"
                required
                autoComplete="username"
                className="w-full h-12 px-4 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('passwordLabel')}</label>
                <a href="#" className="text-xs font-bold text-primary hover:underline">Forgot?</a>
              </div>
              <input
                type="password"
                required
                autoComplete="current-password"
                className="w-full h-12 px-4 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                placeholder="••••••••"
                value={pass}
                onChange={e => setPass(e.target.value)}
              />
            </div>

            <button type="submit" disabled={isLoggingIn} className="w-full h-14 bg-primary text-white font-extrabold rounded-2xl shadow-lg shadow-primary/30 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
              {isLoggingIn ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                t('signInBtn')
              )}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest text-slate-400">
              <span className="bg-white dark:bg-slate-900 px-4">OR</span>
            </div>
          </div>

          <div className="space-y-4">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toastError('Google login failed')}
              width="100%"
              useOneTap
            />
            <button
              onClick={loginAsGuest}
              className="w-full h-12 flex items-center justify-center bg-transparent border-2 border-slate-100 dark:border-slate-800 text-slate-500 font-bold rounded-xl text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {t('continueGuest')}
            </button>
          </div>
        </div>

        <p className="mt-8 text-sm text-slate-500 font-medium">
          Don't have an account? <a href="#" className="text-primary font-bold hover:underline">Sign up for free</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
