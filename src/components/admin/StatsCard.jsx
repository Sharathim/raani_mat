import React from 'react';

export function StatsCard({ title, count, icon: Icon, color = 'var(--maroon-900)', highlight = false, subtitle }) {
  return (
    <div
      className="card-clean"
      style={{
        padding: '1.25rem',
        backgroundColor: '#ffffff',
        border: highlight ? '1.5px solid var(--maroon-700)' : '1px solid var(--border)',
        boxShadow: highlight ? 'var(--shadow-hover)' : 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '110px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)' }}>
          {title}
        </span>
        {Icon && (
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--maroon-50)',
              color: color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Icon size={18} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.5rem' }}>
        <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--ink)', lineHeight: 1 }}>
          {count}
        </div>
        {subtitle && (
          <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
