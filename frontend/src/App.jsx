import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Context & Protection
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  // Inline Style for the main app container
  const appStyle = {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    minHeight: '100vh',
    backgroundColor: '#f4f7f6'
  };

  return (
    <div style={appStyle}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Route: 
                Only accessible if a valid JWT is in localStorage.
                Satisfies the "Enforce users can only see their own data" requirement.
            */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />

            {/* Default Redirection Logic */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* 404 Catch-all */}
            <Route path="*" element={<div style={{ textAlign: 'center', padding: '50px' }}>404 - Page Not Found</div>} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;