


import React, { useEffect } from 'react';
import AppProvider from './context/AppProvider';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from 'react-router-dom';

import { useAuth } from './context/AuthContext';

// Wrapper for Dashboard to handle redirect if not logged in
const ProtectedDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null; // Prevent flicker
  return <Dashboard />;
};

// Wrapper for Login to redirect if already logged in
const LoginRedirect: React.FC = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/" replace />;
  return <Login />;
};

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/login" element={<LoginRedirect />} />
    <Route path="/" element={<ProtectedDashboard />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
};

export default App;
