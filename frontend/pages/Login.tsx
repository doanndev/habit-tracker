
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const Login: React.FC = () => {
  const { t, login, loginAsGuest } = useApp();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, pass);
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
                className="w-full h-12 px-4 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                placeholder="••••••••"
                value={pass}
                onChange={e => setPass(e.target.value)}
              />
            </div>

            <button type="submit" className="w-full h-14 bg-primary text-white font-extrabold rounded-2xl shadow-lg shadow-primary/30 hover:opacity-90 active:scale-[0.98] transition-all">
              {t('signInBtn')}
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
