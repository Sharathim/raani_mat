import React from 'react';
import { FolderSearch } from 'lucide-react';

export function EmptyState({
  titleTa = 'பதிவுகள் எதுவும் கிடைக்கவில்லை',
  titleEn = 'No registrations found',
  description = 'வடிகட்டிகளை மாற்றி மீண்டும் முயற்சிக்கவும் (Try changing your search or filter criteria).',
  action
}) {
  return (
    <div
      style={{
        backgroundColor: 'var(--cream)',
        border: '1.5px dashed var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '3rem 1.5rem',
        textAlign: 'center',
        margin: '1.5rem 0'
      }}
    >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--paper)',
          color: 'var(--maroon-700)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem',
          border: '1px solid var(--border)'
        }}
      >
        <FolderSearch size={28} />
      </div>
      <h3 className="font-tamil-serif" style={{ color: 'var(--maroon-900)', fontSize: '1.2rem', marginBottom: '0.25rem' }}>
        {titleTa}
      </h3>
      <div style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{titleEn}</div>
      <p style={{ color: 'var(--ink-light)', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 1.25rem' }}>
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}
