import React from 'react';
import { FolderSearch } from 'lucide-react';

export function EmptyState({
  titleEn = 'No candidate profiles found',
  description = 'Try adjusting your search criteria or filter selections.',
  action
}) {
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px dashed var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '3rem 1.5rem',
        textAlign: 'center',
        margin: '1.5rem 0'
      }}
    >
      <div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'var(--surface-alt)',
          color: 'var(--maroon-700)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem',
          border: '1px solid var(--border)'
        }}
      >
        <FolderSearch size={24} />
      </div>
      <h3 style={{ color: 'var(--ink)', fontSize: '1.15rem', marginBottom: '0.35rem' }}>
        {titleEn}
      </h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.875rem', maxWidth: '420px', margin: '0 auto 1.25rem' }}>
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}
