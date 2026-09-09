import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { PWAInstallPrompt } from './components/common/PWAInstallPrompt';

// Pages
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { RegistrationSuccessPage } from './pages/RegistrationSuccessPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminCandidatesPage } from './pages/AdminCandidatesPage';
import { AdminCandidateNewPage } from './pages/AdminCandidateNewPage';
import { NotFoundPage } from './pages/NotFoundPage';

function ScrollToHashElement() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null;
}

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToHashElement />
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register/success/:registrationId" element={<RegistrationSuccessPage />} />

            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLoginPage />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/new"
              element={
                <ProtectedRoute>
                  <AdminCandidatesPage statusScope="new" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/profiles"
              element={
                <ProtectedRoute>
                  <AdminCandidatesPage statusScope="reviewed" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/candidates"
              element={<Navigate to="/admin/profiles" replace />}
            />
            <Route
              path="/admin/completed"
              element={
                <ProtectedRoute>
                  <AdminCandidatesPage statusScope="completed" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/profiles/new"
              element={
                <ProtectedRoute>
                  <AdminCandidateNewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/candidates/new"
              element={<Navigate to="/admin/profiles/new" replace />}
            />
            <Route
              path="/admin/profiles/edit/:id"
              element={
                <ProtectedRoute>
                  <AdminCandidateNewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/candidates/edit/:id"
              element={<Navigate to="/admin/profiles/edit/:id" replace />}
            />

            {/* 404 Not Found */}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          {/* PWA App Installation Prompt */}
          <PWAInstallPrompt />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
