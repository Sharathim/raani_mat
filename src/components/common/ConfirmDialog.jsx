import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export function ConfirmDialog({
  isOpen,
  title = 'பதிவை நீக்கவா? (Confirm Deletion)',
  message = 'இந்த பதிவை நிச்சயமாக நீக்க விரும்புகிறீர்களா? இந்த செயலை மாற்றியமைக்க முடியாது. (Are you sure you want to delete this registration? This action cannot be undone.)',
  confirmText = 'நீக்கவும் (Delete)',
  cancelText = 'ரத்து செய் (Cancel)',
  onConfirm,
  onCancel,
  isDestructive = true,
  isLoading = false
}) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(53, 19, 26, 0.65)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <div
        className="card-ornate"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '1.75rem',
          backgroundColor: 'var(--paper)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: isDestructive ? 'var(--danger-bg)' : 'var(--warning-bg)',
                color: isDestructive ? 'var(--danger)' : 'var(--warning)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <AlertTriangle size={22} />
            </div>
            <h3 id="dialog-title" className="font-tamil-serif" style={{ fontSize: '1.2rem', margin: 0, color: 'var(--maroon-950)' }}>
              {title}
            </h3>
          </div>
          <button
            onClick={onCancel}
            disabled={isLoading}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)' }}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <p style={{ color: 'var(--ink)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
          {message}
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`btn ${isDestructive ? 'btn-danger' : 'btn-primary'} btn-sm`}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'நீக்குகிறது...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
