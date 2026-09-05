import React from 'react';
import { Search, X } from 'lucide-react';

export function SearchBar({
  searchTerm,
  onSearchChange,
  placeholder = 'Search by name, phone, location, education, ID...'
}) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '380px' }}>
      <Search
        size={16}
        style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--muted)',
          pointerEvents: 'none'
        }}
      />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.55rem 2.25rem 0.55rem 2.25rem',
          backgroundColor: '#ffffff',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.875rem',
          outline: 'none',
          color: 'var(--ink)'
        }}
      />
      {searchTerm && (
        <button
          type="button"
          onClick={() => onSearchChange('')}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: 'var(--muted)',
            cursor: 'pointer',
            padding: '2px',
            display: 'flex',
            alignItems: 'center'
          }}
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
