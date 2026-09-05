import React from 'react';

export function StatsCard({ titleTa, titleEn, count, icon: Icon, color = 'var(--maroon-900)', bg = 'var(--paper)', highlight = false }) {
  return (
    <div
      className="card-ornate"
      style={{
        padding: '1.25rem',
        backgroundColor: bg,
        border: highlight ? '2px solid var(--gold-500)' : '1px solid var(--border)',
        boxShadow: highlight ? 'var(--shadow-gold)' : 'var(--shadow-sm)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <div>
          <div className="font-tamil-sans" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--maroon-950)' }}>
            {titleTa}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{titleEn}</div>
        </div>
        {Icon && (
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--cream)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: color
            }}
          >
            <Icon size={20} />
          </div>
        )}
      </div>

      <div style={{ fontSize: '1.85rem', fontWeight: 800, color: color, fontFamily: 'var(--font-heading)' }}>
        {count}
      </div>
    </div>
  );
}
