import React, { useState, useEffect } from 'react';
import { X, Check, RotateCcw, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { REGISTRATION_STATUS } from '../../utils/constants';

export function CandidateFilterModal({
  isOpen,
  onClose,
  statusFilter,
  onStatusChange,
  genderFilter,
  onGenderChange,
  photoFilter,
  onPhotoChange,
  sortBy,
  onSortChange
}) {
  // Temporary state for unapplied changes
  const [tempStatus, setTempStatus] = useState(statusFilter);
  const [tempGender, setTempGender] = useState(genderFilter);
  const [tempPhoto, setTempPhoto] = useState(photoFilter);
  const [tempSort, setTempSort] = useState(sortBy);

  useEffect(() => {
    if (isOpen) {
      setTempStatus(statusFilter);
      setTempGender(genderFilter);
      setTempPhoto(photoFilter);
      setTempSort(sortBy);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, statusFilter, genderFilter, photoFilter, sortBy]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: REGISTRATION_STATUS.NEW, label: 'New' },
    { value: REGISTRATION_STATUS.CONTACTED, label: 'Contacted' },
    { value: REGISTRATION_STATUS.SHORTLISTED, label: 'Shortlisted' },
    { value: REGISTRATION_STATUS.CLOSED, label: 'Closed' }
  ];

  const genderOptions = [
    { value: 'all', label: 'All Genders' },
    { value: 'Female', label: 'Bride (Female)' },
    { value: 'Male', label: 'Groom (Male)' }
  ];

  const photoOptions = [
    { value: 'all', label: 'All Profiles' },
    { value: 'withPhoto', label: 'With Photo' },
    { value: 'noPhoto', label: 'No Photo' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'nameAsc', label: 'Name A–Z' },
    { value: 'nameDesc', label: 'Name Z–A' }
  ];

  const handleApply = () => {
    onStatusChange(tempStatus);
    onGenderChange(tempGender);
    onPhotoChange(tempPhoto);
    onSortChange(tempSort);
    onClose();
  };

  const handleReset = () => {
    setTempStatus('all');
    setTempGender('all');
    setTempPhoto('all');
    setTempSort('newest');
    onStatusChange('all');
    onGenderChange('all');
    onPhotoChange('all');
    onSortChange('newest');
    onClose();
  };

  return (
    <div
      className="filter-sheet-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="candidate-filter-title"
    >
      <div
        className="filter-sheet-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Indicator */}
        <div className="filter-sheet-drag-handle" />

        {/* Filter Modal Header */}
        <div className="filter-sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div className="filter-sheet-header-icon">
              <SlidersHorizontal size={18} />
            </div>
            <h3 id="candidate-filter-title" className="filter-sheet-title">
              Filter Candidates
            </h3>
          </div>
          <button
            type="button"
            className="filter-sheet-close"
            onClick={onClose}
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter Modal Body */}
        <div className="filter-sheet-body">
          {/* Status Section */}
          <div className="filter-sheet-section">
            <label className="filter-sheet-label">Registration Status</label>
            <div className="filter-options-grid">
              {statusOptions.map((opt) => {
                const isSelected = tempStatus === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setTempStatus(opt.value)}
                    className={`filter-chip-btn ${isSelected ? 'selected' : ''}`}
                  >
                    {isSelected && <Check size={14} className="chip-check-icon" />}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gender Section */}
          <div className="filter-sheet-section">
            <label className="filter-sheet-label">Gender / Profile For</label>
            <div className="filter-options-grid">
              {genderOptions.map((opt) => {
                const isSelected = tempGender === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setTempGender(opt.value)}
                    className={`filter-chip-btn ${isSelected ? 'selected' : ''}`}
                  >
                    {isSelected && <Check size={14} className="chip-check-icon" />}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Photo Availability Section */}
          <div className="filter-sheet-section">
            <label className="filter-sheet-label">Profile Photo</label>
            <div className="filter-options-grid">
              {photoOptions.map((opt) => {
                const isSelected = tempPhoto === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setTempPhoto(opt.value)}
                    className={`filter-chip-btn ${isSelected ? 'selected' : ''}`}
                  >
                    {isSelected && <Check size={14} className="chip-check-icon" />}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sorting Section */}
          <div className="filter-sheet-section">
            <label className="filter-sheet-label">Sort Order</label>
            <div className="filter-options-grid">
              {sortOptions.map((opt) => {
                const isSelected = tempSort === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setTempSort(opt.value)}
                    className={`filter-chip-btn ${isSelected ? 'selected' : ''}`}
                  >
                    {isSelected && <Check size={14} className="chip-check-icon" />}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filter Modal Footer */}
        <div className="filter-sheet-footer">
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary filter-sheet-reset-btn"
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="btn btn-primary filter-sheet-apply-btn"
          >
            <span>Apply Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}
