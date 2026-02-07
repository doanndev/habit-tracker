'use client';

import React from 'react';

interface DashboardFooterProps {
  t: (key: string) => string;
}

const DashboardFooter: React.FC<DashboardFooterProps> = ({ t }) => {
  return (
    <footer className="mt-16 text-center">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-lg">H</span>
            </div>
            <div>
              <h3 className="font-black text-slate-900 dark:text-white text-lg">Habit Tracker</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Build better habits, one day at a time</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
            <a href="#" className="hover:text-primary transition-colors font-medium">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors font-medium">Terms</a>
            <a href="#" className="hover:text-primary transition-colors font-medium">Support</a>
          </div>

          <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            © 2024 Habit Tracker. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;
