import React from 'react';
import { Sparkles } from 'lucide-react';

export function GoldDivider({ className = '' }) {
  return (
    <div className={`gold-divider ${className}`} aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', margin: '1.25rem 0' }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, var(--border), transparent)' }} />
      <span style={{ color: 'var(--gold-700)', display: 'flex', alignItems: 'center' }}>
        <Sparkles size={14} />
      </span>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, var(--border), transparent)' }} />
    </div>
  );
}

export function SectionHeader({ title, subtitle, badge = 'Service Highlights', align = 'center' }) {
  return (
    <div style={{ textAlign: align, marginBottom: '2.5rem' }}>
      {badge && (
        <div style={{ display: 'inline-block', marginBottom: '0.4rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              background: 'var(--maroon-50)',
              color: 'var(--maroon-900)',
              border: '1px solid rgba(138, 16, 38, 0.2)',
              borderRadius: 'var(--radius-pill)',
              padding: '0.25rem 0.85rem',
              fontSize: '0.775rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            <span>❖</span>
            <span>{badge}</span>
            <span>❖</span>
          </span>
        </div>
      )}
      {title && (
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: 'var(--maroon-950)', marginTop: '0.35rem' }}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: '620px', margin: align === 'center' ? '0.4rem auto 0' : '0.4rem 0 0', lineHeight: 1.6 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function OrnateCorner({ position = 'top-left' }) {
  const styles = {
    position: 'absolute',
    width: '20px',
    height: '20px',
    pointerEvents: 'none',
    opacity: 0.65,
    ...(position === 'top-left' && { top: '6px', left: '6px' }),
    ...(position === 'top-right' && { top: '6px', right: '6px', transform: 'rotate(90deg)' }),
    ...(position === 'bottom-left' && { bottom: '6px', left: '6px', transform: 'rotate(-90deg)' }),
    ...(position === 'bottom-right' && { bottom: '6px', right: '6px', transform: 'rotate(180deg)' })
  };

  return (
    <svg style={styles} viewBox="0 0 24 24" fill="none" stroke="var(--gold-500)" strokeWidth="1.5">
      <path d="M2 22 V6 C2 3.79 3.79 2 6 2 H22" />
      <circle cx="6" cy="6" r="2" fill="var(--gold-300)" />
    </svg>
  );
}
