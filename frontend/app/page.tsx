'use client'

import { useAuth } from '../context/AppContext';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

export default function Home() {
  const { user, loading } = useAuth();

  // Show loading state while auth is being determined
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Simple page switching logic based on auth state
  if (!user) {
    return <Login />;
  }

  return <Dashboard />;
}
