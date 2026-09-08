import React, { useEffect } from 'react';
import { LogOut, X } from 'lucide-react';

export function LogoutConfirmDialog({ isOpen, onCancel, onConfirm, isLoading = false }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onCancel();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onCancel, isLoading]);

  if (!isOpen) return null;

  return (
    <div
      className="admin-dialog-backdrop"
      onClick={!isLoading ? onCancel : undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-dialog-title"
    >
      <div
        className="admin-logout-dialog-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-logout-dialog-header">
          <div className="admin-logout-dialog-icon">
            <LogOut size={22} />
          </div>
          <div className="admin-logout-dialog-heading-wrap">
            <h3 id="logout-dialog-title" className="admin-logout-dialog-title">
              Logout
            </h3>
            <p className="admin-logout-dialog-subtitle">
              Admin Session
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="admin-dialog-close-btn"
            aria-label="Close logout dialog"
          >
            <X size={18} />
          </button>
        </div>

        <div className="admin-logout-dialog-body">
          <p className="admin-logout-dialog-message">
            Are you sure you want to logout from the admin dashboard?
          </p>
        </div>

        <div className="admin-logout-dialog-footer">
          <button
            type="button"
            className="btn btn-secondary admin-logout-cancel-btn"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger admin-logout-confirm-btn"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
    </div>
  );
}
