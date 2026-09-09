import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';
import { AdminBottomNav } from './AdminBottomNav';
import { LogoutConfirmDialog } from './LogoutConfirmDialog';
import { ErrorBoundary } from '../common/ErrorBoundary';

export function AdminLayout({
  children,
  onRefresh,
  isRefreshing = false
}) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('Logout error:', err);
      setIsLoggingOut(false);
      setIsLogoutModalOpen(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="admin-app-root">
        {/* Desktop Header (Visible on >= 769px, Hidden on <= 768px) */}
        <DesktopHeader
          onRequestLogout={() => setIsLogoutModalOpen(true)}
        />

        {/* Mobile Header (Visible on <= 768px, Hidden on >= 769px) */}
        <MobileHeader />

        {/* Main Content Area */}
        <main className="admin-main-content">
          {children}
        </main>

        {/* Mobile Fixed Bottom Navigation (Hidden on >= 769px, Visible on <= 768px) */}
        <AdminBottomNav
          onRequestLogout={() => setIsLogoutModalOpen(true)}
        />

        {/* Centralized Logout Confirmation Dialog */}
        <LogoutConfirmDialog
          isOpen={isLogoutModalOpen}
          onCancel={() => setIsLogoutModalOpen(false)}
          onConfirm={handleConfirmLogout}
          isLoading={isLoggingOut}
        />
      </div>
    </ErrorBoundary>
  );
}
