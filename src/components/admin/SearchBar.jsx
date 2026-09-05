import React from 'react';
import { Search, X } from 'lucide-react';

export function SearchBar({ searchTerm, onSearchChange, placeholder = 'பெயர், தொலைபேசி, ஊர், பதிவு எண் மூலம் தேடுக... (Search by name, phone, ID...)' }) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '460px' }}>
      <Search
        size={18}
        style={{
          position: 'absolute',
          left: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'var(--maroon-700)',
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
          padding: '0.65rem 2.25rem 0.65rem 2.4rem',
          backgroundColor: '#ffffff',
          border: '1.5px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '0.9rem',
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
            padding: '2px'
          }}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
