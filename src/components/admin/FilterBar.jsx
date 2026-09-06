import React from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';
import { REGISTRATION_STATUS } from '../../utils/constants';

export function FilterBar({
  statusFilter,
  onStatusChange,
  genderFilter,
  onGenderChange,
  photoFilter,
  onPhotoChange,
  sortBy,
  onSortChange
}) {
  const statusTabs = [
    { value: 'all', label: 'All Status' },
    { value: REGISTRATION_STATUS.NEW, label: 'New' },
    { value: REGISTRATION_STATUS.CONTACTED, label: 'Contacted' },
    { value: REGISTRATION_STATUS.SHORTLISTED, label: 'Shortlisted' },
    { value: REGISTRATION_STATUS.CLOSED, label: 'Closed' }
  ];

  return (
    <div
      className="filter-bar"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        padding: '0.75rem 1rem',
        backgroundColor: '#ffffff',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        marginBottom: '1rem'
      }}
    >
      {/* Left: Status Filter Pills */}
      <div className="status-filter-tabs" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => onStatusChange(tab.value)}
            className={`filter-tab ${statusFilter === tab.value ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Right: Gender, Photo & Sort Controls */}
      <div className="filter-selects" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        {/* Gender Filter */}
        <select
          value={genderFilter}
          onChange={(e) => onGenderChange(e.target.value)}
          style={{
            padding: '0.35rem 0.65rem',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--border)',
            backgroundColor: '#ffffff',
            fontSize: '0.8rem',
            color: 'var(--ink)'
          }}
        >
          <option value="all">All Genders</option>
          <option value="Female">Bride (Female)</option>
          <option value="Male">Groom (Male)</option>
        </select>

        {/* Photo Filter */}
        <select
          value={photoFilter}
          onChange={(e) => onPhotoChange(e.target.value)}
          style={{
            padding: '0.35rem 0.65rem',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--border)',
            backgroundColor: '#ffffff',
            fontSize: '0.8rem',
            color: 'var(--ink)'
          }}
        >
          <option value="all">All Profiles</option>
          <option value="withPhoto">With Photo</option>
          <option value="noPhoto">No Photo</option>
        </select>

        {/* Sort By */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <ArrowUpDown size={14} color="var(--muted)" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border)',
              backgroundColor: '#ffffff',
              fontSize: '0.8rem',
              fontWeight: 500,
              color: 'var(--ink)'
            }}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="nameAsc">Name A–Z</option>
            <option value="nameDesc">Name Z–A</option>
          </select>
        </div>
      </div>
    </div>
  );
}
