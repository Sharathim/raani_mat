import React from 'react';
import { AlertCircle, X } from 'lucide-react';

export function ErrorBanner({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div
      style={{
        backgroundColor: 'var(--danger-bg)',
        border: '1.5px solid var(--danger-border)',
        borderRadius: 'var(--radius-sm)',
        padding: '0.85rem 1.25rem',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        color: 'var(--danger)'
      }}
      role="alert"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        <AlertCircle size={20} style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{message}</span>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--danger)',
            cursor: 'pointer',
            padding: '0.2rem'
          }}
          aria-label="Dismiss error"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
