import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';

export function SearchBar({
  searchTerm,
  onSearchChange,
  placeholder = 'Search candidates by name, phone, location...',
  onOpenFilter,
  activeFilterCount = 0
}) {
  return (
    <div className="admin-search-wrapper">
      <div className="admin-search-icon-box">
        <Search size={18} />
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="admin-search-input"
        aria-label="Search candidate profiles"
      />

      {searchTerm && (
        <button
          type="button"
          onClick={() => onSearchChange('')}
          className="admin-search-clear-btn"
          aria-label="Clear search text"
        >
          <X size={16} />
        </button>
      )}

      {onOpenFilter && (
        <button
          type="button"
          onClick={onOpenFilter}
          className={`admin-search-filter-btn ${activeFilterCount > 0 ? 'has-active' : ''}`}
          aria-label="Filter candidates"
          title="Filter candidates"
        >
          <SlidersHorizontal size={18} />
          {activeFilterCount > 0 && (
            <span className="admin-search-filter-badge" aria-label={`${activeFilterCount} filters active`}>
              {activeFilterCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
