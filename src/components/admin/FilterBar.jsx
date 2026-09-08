import React, { useState, useEffect } from 'react';
import { Filter, ArrowUpDown, X, Check, RotateCcw, SlidersHorizontal } from 'lucide-react';
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
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  // Temporary local state for bottom sheet before applying
  const [tempGender, setTempGender] = useState(genderFilter);
  const [tempPhoto, setTempPhoto] = useState(photoFilter);

  // Sync temp state whenever prop changes or modal opens
  useEffect(() => {
    setTempGender(genderFilter);
    setTempPhoto(photoFilter);
  }, [genderFilter, photoFilter, isFilterSheetOpen]);

  // Lock body scroll when bottom sheet is open
  useEffect(() => {
    if (isFilterSheetOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFilterSheetOpen]);

  const statusTabs = [
    { value: 'all', label: 'All Status' },
    { value: REGISTRATION_STATUS.NEW, label: 'New' },
    { value: REGISTRATION_STATUS.CONTACTED, label: 'Contacted' },
    { value: REGISTRATION_STATUS.SHORTLISTED, label: 'Shortlisted' },
    { value: REGISTRATION_STATUS.CLOSED, label: 'Closed' }
  ];

  // Count active non-status filters
  const activeFiltersCount = (genderFilter !== 'all' ? 1 : 0) + (photoFilter !== 'all' ? 1 : 0);

  const handleApplyFilters = () => {
    onGenderChange(tempGender);
    onPhotoChange(tempPhoto);
    setIsFilterSheetOpen(false);
  };

  const handleResetFilters = () => {
    setTempGender('all');
    setTempPhoto('all');
    onGenderChange('all');
    onPhotoChange('all');
    setIsFilterSheetOpen(false);
  };

  return (
    <div className="filter-bar-container">
      {/* 1. Status Filter Pills Bar (Horizontal Scrollable on Mobile) */}
      <div className="status-tabs-wrapper">
        <div className="status-tabs-scroll" role="tablist" aria-label="Filter by registration status">
          {statusTabs.map((tab) => {
            const isActive = statusFilter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onStatusChange(tab.value)}
                className={`filter-tab ${isActive ? 'active' : ''}`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Secondary Filter & Sort Controls Row */}
      <div className="filter-controls-row">
        {/* Mobile View: Compact [ Filters ] + [ Sort ] buttons */}
        <div className="filter-mobile-actions">
          <button
            type="button"
            className={`btn-mobile-filter ${activeFiltersCount > 0 ? 'has-active' : ''}`}
            onClick={() => setIsFilterSheetOpen(true)}
            aria-label="Open filter options"
          >
            <SlidersHorizontal size={15} />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="filter-count-badge">{activeFiltersCount}</span>
            )}
          </button>

          <div className="sort-mobile-container">
            <ArrowUpDown size={14} className="sort-mobile-icon" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="sort-mobile-select"
              aria-label="Sort candidates"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="nameAsc">Name A–Z</option>
              <option value="nameDesc">Name Z–A</option>
            </select>
          </div>
        </div>

        {/* Desktop View: Full inline select dropdowns */}
        <div className="filter-desktop-selects">
          {/* Gender Filter */}
          <select
            value={genderFilter}
            onChange={(e) => onGenderChange(e.target.value)}
            className="filter-select"
            aria-label="Filter by gender"
          >
            <option value="all">All Genders</option>
            <option value="Female">Bride (Female)</option>
            <option value="Male">Groom (Male)</option>
          </select>

          {/* Photo Filter */}
          <select
            value={photoFilter}
            onChange={(e) => onPhotoChange(e.target.value)}
            className="filter-select"
            aria-label="Filter by photo availability"
          >
            <option value="all">All Profiles</option>
            <option value="withPhoto">With Photo</option>
            <option value="noPhoto">No Photo</option>
          </select>

          {/* Sort By */}
          <div className="sort-desktop-wrapper">
            <ArrowUpDown size={14} color="var(--muted)" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="filter-select font-medium"
              aria-label="Sort registrations"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="nameAsc">Name A–Z</option>
              <option value="nameDesc">Name Z–A</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Mobile Filter Bottom Sheet */}
      {isFilterSheetOpen && (
        <div
          className="filter-sheet-backdrop"
          onClick={() => setIsFilterSheetOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="filter-sheet-panel"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle */}
            <div className="filter-sheet-drag-handle" />

            {/* Sheet Header */}
            <div className="filter-sheet-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <SlidersHorizontal size={18} color="var(--maroon-900)" />
                <h3 className="filter-sheet-title">Filter Candidates</h3>
              </div>
              <button
                type="button"
                className="filter-sheet-close"
                onClick={() => setIsFilterSheetOpen(false)}
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>

            {/* Sheet Body */}
            <div className="filter-sheet-body">
              {/* Gender Section */}
              <div className="filter-sheet-section">
                <label className="filter-sheet-label">Gender / Profile For</label>
                <div className="filter-options-grid">
                  {[
                    { value: 'all', label: 'All Genders' },
                    { value: 'Female', label: 'Bride (Female)' },
                    { value: 'Male', label: 'Groom (Male)' }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setTempGender(opt.value)}
                      className={`filter-chip-btn ${tempGender === opt.value ? 'selected' : ''}`}
                    >
                      {tempGender === opt.value && <Check size={14} className="chip-check-icon" />}
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Availability Section */}
              <div className="filter-sheet-section">
                <label className="filter-sheet-label">Profile Photo</label>
                <div className="filter-options-grid">
                  {[
                    { value: 'all', label: 'All Profiles' },
                    { value: 'withPhoto', label: 'With Photo' },
                    { value: 'noPhoto', label: 'No Photo' }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setTempPhoto(opt.value)}
                      className={`filter-chip-btn ${tempPhoto === opt.value ? 'selected' : ''}`}
                    >
                      {tempPhoto === opt.value && <Check size={14} className="chip-check-icon" />}
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sheet Footer Actions */}
            <div className="filter-sheet-footer">
              <button
                type="button"
                onClick={handleResetFilters}
                className="btn btn-secondary filter-sheet-reset-btn"
              >
                <RotateCcw size={15} />
                <span>Reset</span>
              </button>
              <button
                type="button"
                onClick={handleApplyFilters}
                className="btn btn-primary filter-sheet-apply-btn"
              >
                <span>Apply Filters</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
