'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage, useAuth } from '../context/AppContext';

const Register: React.FC = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Always call hooks in the same order - never conditionally
  const { t } = useLanguage();
  const { register, loginAsGuest, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading state while hooks are initializing
  if (loading && !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pass !== confirmPass) {
      // Error is handled by toast in AuthProvider
      return;
    }

    try {
      await register(email, pass);
      router.push('/');
    } catch (err) {
      // Error is handled by toast in AuthProvider
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-[440px] flex flex-col items-center">
        <div className="mb-8 text-center">
          <div className="size-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/30 mb-5 mx-auto">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">{t('appName')}</h1>
          <p className="text-slate-500 dark:text-slate-400">{t('registerSubtitle')}</p>
        </div>

        <div className="w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('emailLabel')}</label>
              <input
                type="email"
                required
                className="w-full h-12 px-4 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('passwordLabel')}</label>
              <input
                type="password"
                required
                className="w-full h-12 px-4 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                placeholder="••••••••"
                value={pass}
                onChange={e => setPass(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('confirmPasswordLabel')}</label>
              <input
                type="password"
                required
                className="w-full h-12 px-4 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                placeholder="••••••••"
                value={confirmPass}
                onChange={e => setConfirmPass(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading || pass !== confirmPass}
              className="w-full h-14 bg-primary text-white font-extrabold rounded-2xl shadow-lg shadow-primary/30 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? 'Creating account...' : t('signUpBtn')}
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
            <button className="w-full h-12 flex items-center justify-center gap-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" className="w-5 h-5" alt="Google" />
              Continue with Google
            </button>
            <button
              onClick={() => {
                loginAsGuest();
                router.push('/');
              }}
              className="w-full h-12 flex items-center justify-center bg-transparent border-2 border-slate-100 dark:border-slate-800 text-slate-500 font-bold rounded-xl text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {t('continueGuest')}
            </button>
          </div>
        </div>

        <p className="mt-8 text-sm text-slate-500 font-medium">
          {t('alreadyHaveAccount')} <Link href="/Login" className="text-primary font-bold hover:underline">{t('signInLink')}</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
