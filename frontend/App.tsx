
import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const AppContent: React.FC = () => {
  const { user } = useApp();
  
  // Simple page switching logic based on auth state
  if (!user) {
    return <Login />;
  }

  return <Dashboard />;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
