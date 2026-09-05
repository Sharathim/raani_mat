import React from 'react';
import { Sparkles } from 'lucide-react';

export function GoldDivider({ className = '' }) {
  return (
    <div className={`gold-divider ${className}`} aria-hidden="true">
      <span className="gold-divider-icon">
        <Sparkles size={16} />
      </span>
    </div>
  );
}

export function SectionHeader({ titleTa, titleEn, subtitle, align = 'center' }) {
  return (
    <div style={{ textAlign: align, marginBottom: '2.25rem' }}>
      <div style={{ display: 'inline-block', marginBottom: '0.5rem' }}>
        <span className="pill-title">
          <span>❖</span>
          <span>{titleTa}</span>
          <span>❖</span>
        </span>
      </div>
      {titleEn && (
        <h2 style={{ fontSize: '1.75rem', color: 'var(--maroon-900)', marginTop: '0.4rem' }}>
          {titleEn}
        </h2>
      )}
      {subtitle && (
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: '600px', margin: align === 'center' ? '0.4rem auto 0' : '0.4rem 0 0' }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function OrnateCorner({ position = 'top-left' }) {
  const styles = {
    position: 'absolute',
    width: '24px',
    height: '24px',
    pointerEvents: 'none',
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
