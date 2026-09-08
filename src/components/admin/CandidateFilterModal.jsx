import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Check,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  User,
  Calendar,
  Layers,
  Scroll,
  Ruler
} from 'lucide-react';
import {
  REGISTRATION_STATUS,
  RELIGIONS,
  COMMUNITY_CATEGORIES,
  getCastesForReligion,
  HINDU_CASTES,
  ALL_CASTES,
  ZODIAC_SIGNS,
  NAKSHATRAS,
  LAGNAMS,
  MARITAL_STATUS_OPTIONS
} from '../../utils/constants';

export const DOSHAM_FILTER_OPTIONS = [
  { value: 'all', label: 'All / Any Dosham' },
  { value: 'None', label: 'No Dosham (None / சுத்த ஜாதகம்)' },
  { value: 'Chevvai', label: 'Chevvai Dosham (செவ்வாய் தோஷம்)' },
  { value: 'Sarpa', label: 'Rahu-Kethu / Sarpa Dosham (சர்ப்ப தோஷம்)' },
  { value: 'Kalathra', label: 'Kalathra Dosham (களத்திர தோஷம்)' }
];

export const AGE_PRESET_OPTIONS = [
  { label: 'All Ages', min: '', max: '' },
  { label: '18 – 25 yrs', min: '18', max: '25' },
  { label: '26 – 30 yrs', min: '26', max: '30' },
  { label: '31 – 35 yrs', min: '31', max: '35' },
  { label: '36 – 40 yrs', min: '36', max: '40' },
  { label: '40+ yrs', min: '40', max: '80' }
];

export function CandidateFilterModal({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters
}) {
  const [tempFilters, setTempFilters] = useState(filters);

  // Sync tempFilters when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempFilters(filters);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, filters]);

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

  const handleFieldChange = (name, value) => {
    setTempFilters((prev) => {
      const updated = { ...prev, [name]: value };

      // If religion changes, reset caste if it no longer applies
      if (name === 'religion' && value !== 'all') {
        const available = getCastesForReligion(value);
        if (updated.caste !== 'all' && !available.includes(updated.caste)) {
          updated.caste = 'all';
        }
      }
      return updated;
    });
  };

  const handleAgePreset = (preset) => {
    setTempFilters((prev) => ({
      ...prev,
      minAge: preset.min,
      maxAge: preset.max
    }));
  };

  // Calculate active filter count in temporary state
  const tempActiveCount = (() => {
    let count = 0;
    if (tempFilters.status !== 'all') count++;
    if (tempFilters.gender !== 'all') count++;
    if (tempFilters.photo !== 'all') count++;
    if (tempFilters.maritalStatus !== 'all') count++;
    if (tempFilters.minAge || tempFilters.maxAge) count++;
    if (tempFilters.religion !== 'all') count++;
    if (tempFilters.community !== 'all') count++;
    if (tempFilters.caste !== 'all') count++;
    if (tempFilters.birthStar !== 'all') count++;
    if (tempFilters.zodiacSign !== 'all') count++;
    if (tempFilters.lagnam !== 'all') count++;
    if (tempFilters.gothram && tempFilters.gothram.trim()) count++;
    if (tempFilters.dosham !== 'all') count++;
    if (tempFilters.height && tempFilters.height.trim()) count++;
    if (tempFilters.sortBy !== 'newest') count++;
    return count;
  })();

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
    { value: 'nameAsc', label: 'Name (A–Z)' },
    { value: 'nameDesc', label: 'Name (Z–A)' },
    { value: 'ageAsc', label: 'Age (Youngest First)' },
    { value: 'ageDesc', label: 'Age (Oldest First)' }
  ];

  const availableCastes = tempFilters.religion && tempFilters.religion !== 'all'
    ? getCastesForReligion(tempFilters.religion)
    : HINDU_CASTES;

  const handleApply = () => {
    onApplyFilters(tempFilters);
    onClose();
  };

  const handleReset = () => {
    const defaultState = {
      status: 'all',
      gender: 'all',
      photo: 'all',
      maritalStatus: 'all',
      minAge: '',
      maxAge: '',
      religion: 'all',
      community: 'all',
      caste: 'all',
      birthStar: 'all',
      zodiacSign: 'all',
      lagnam: 'all',
      gothram: '',
      dosham: 'all',
      height: '',
      sortBy: 'newest'
    };
    setTempFilters(defaultState);
    if (onResetFilters) {
      onResetFilters();
    } else {
      onApplyFilters(defaultState);
    }
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
        {/* Mobile Drag Handle */}
        <div className="filter-sheet-drag-handle" />

        {/* Filter Modal Header */}
        <div className="filter-sheet-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div className="filter-sheet-header-icon">
              <SlidersHorizontal size={18} />
            </div>
            <div>
              <h3 id="candidate-filter-title" className="filter-sheet-title">
                Filter Candidates
              </h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                Refine profiles by age, horoscope, caste & religion
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {tempActiveCount > 0 && (
              <span
                style={{
                  background: 'var(--maroon-700)',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.55rem',
                  borderRadius: '10px'
                }}
              >
                {tempActiveCount} active
              </span>
            )}
            <button
              type="button"
              className="filter-sheet-close"
              onClick={onClose}
              aria-label="Close filters"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Filter Modal Body */}
        <div className="filter-sheet-body">
          {/* GROUP 1: Status & Demographics */}
          <div className="filter-sheet-group">
            <h4 className="filter-sheet-group-title">
              <User size={15} />
              <span>Status & Profile Type</span>
            </h4>

            {/* Status Section */}
            <div className="filter-sheet-section">
              <label className="filter-sheet-label">Registration Status</label>
              <div className="filter-options-grid">
                {statusOptions.map((opt) => {
                  const isSelected = tempFilters.status === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleFieldChange('status', opt.value)}
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
                  const isSelected = tempFilters.gender === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleFieldChange('gender', opt.value)}
                      className={`filter-chip-btn ${isSelected ? 'selected' : ''}`}
                    >
                      {isSelected && <Check size={14} className="chip-check-icon" />}
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Photo & Marital Status Row */}
            <div className="filter-sheet-row">
              <div className="filter-sheet-section">
                <label className="filter-sheet-label">Profile Photo</label>
                <select
                  value={tempFilters.photo}
                  onChange={(e) => handleFieldChange('photo', e.target.value)}
                  className="filter-select-input"
                >
                  {photoOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="filter-sheet-section">
                <label className="filter-sheet-label">Marital Status</label>
                <select
                  value={tempFilters.maritalStatus}
                  onChange={(e) => handleFieldChange('maritalStatus', e.target.value)}
                  className="filter-select-input"
                >
                  <option value="all">All Marital Statuses</option>
                  {MARITAL_STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* GROUP 2: Age & Height Filters */}
          <div className="filter-sheet-group">
            <h4 className="filter-sheet-group-title">
              <Calendar size={15} />
              <span>Age & Height Requirements</span>
            </h4>

            {/* Age Presets */}
            <div className="filter-sheet-section">
              <label className="filter-sheet-label">Age Range Presets</label>
              <div className="filter-options-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(95px, 1fr))' }}>
                {AGE_PRESET_OPTIONS.map((preset, idx) => {
                  const isSelected = tempFilters.minAge === preset.min && tempFilters.maxAge === preset.max;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAgePreset(preset)}
                      className={`filter-chip-btn ${isSelected ? 'selected' : ''}`}
                      style={{ fontSize: '0.78rem', padding: '0.4rem 0.5rem' }}
                    >
                      {isSelected && <Check size={12} className="chip-check-icon" />}
                      <span>{preset.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Min / Max Age Inputs & Height */}
            <div className="filter-sheet-row">
              <div className="filter-sheet-section">
                <label className="filter-sheet-label">Min Age (Years)</label>
                <input
                  type="number"
                  min="18"
                  max="100"
                  placeholder="e.g. 22"
                  value={tempFilters.minAge || ''}
                  onChange={(e) => handleFieldChange('minAge', e.target.value)}
                  className="filter-text-input"
                />
              </div>

              <div className="filter-sheet-section">
                <label className="filter-sheet-label">Max Age (Years)</label>
                <input
                  type="number"
                  min="18"
                  max="100"
                  placeholder="e.g. 30"
                  value={tempFilters.maxAge || ''}
                  onChange={(e) => handleFieldChange('maxAge', e.target.value)}
                  className="filter-text-input"
                />
              </div>

              <div className="filter-sheet-section">
                <label className="filter-sheet-label">Height (Filter / Search)</label>
                <input
                  type="text"
                  placeholder="e.g. 5 ft 6 in or 168 cm"
                  value={tempFilters.height || ''}
                  onChange={(e) => handleFieldChange('height', e.target.value)}
                  className="filter-text-input"
                />
              </div>
            </div>
          </div>

          {/* GROUP 3: Religion & Caste Details */}
          <div className="filter-sheet-group">
            <h4 className="filter-sheet-group-title">
              <Layers size={15} />
              <span>Religion & Caste / Community</span>
            </h4>

            <div className="filter-sheet-row">
              <div className="filter-sheet-section">
                <label className="filter-sheet-label">Religion (மதம்)</label>
                <select
                  value={tempFilters.religion}
                  onChange={(e) => handleFieldChange('religion', e.target.value)}
                  className="filter-select-input"
                >
                  <option value="all">All Religions (அனைத்து மதம்)</option>
                  {RELIGIONS.map((rel) => (
                    <option key={rel.value} value={rel.value}>{rel.label}</option>
                  ))}
                </select>
              </div>

              <div className="filter-sheet-section">
                <label className="filter-sheet-label">Community Category (பிரிவு)</label>
                <select
                  value={tempFilters.community}
                  onChange={(e) => handleFieldChange('community', e.target.value)}
                  className="filter-select-input"
                >
                  <option value="all">All Communities (அனைத்து பிரிவு)</option>
                  {COMMUNITY_CATEGORIES.map((comm) => (
                    <option key={comm.value} value={comm.value}>{comm.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="filter-sheet-section">
              <label className="filter-sheet-label">Caste / Community (சாதி)</label>
              <select
                value={tempFilters.caste}
                onChange={(e) => handleFieldChange('caste', e.target.value)}
                className="filter-select-input"
              >
                <option value="all">All Castes (அனைத்து சாதி)</option>
                {availableCastes.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* GROUP 4: Horoscope & Astrological Details */}
          <div className="filter-sheet-group">
            <h4 className="filter-sheet-group-title">
              <Sparkles size={15} />
              <span>Horoscope & Astrological Details</span>
            </h4>

            <div className="filter-sheet-row">
              <div className="filter-sheet-section">
                <label className="filter-sheet-label">Birth Star / Nakshatra (நட்சத்திரம்)</label>
                <select
                  value={tempFilters.birthStar}
                  onChange={(e) => handleFieldChange('birthStar', e.target.value)}
                  className="filter-select-input"
                >
                  <option value="all">All 27 Nakshatras (அனைத்து நட்சத்திரம்)</option>
                  {NAKSHATRAS.map((star) => (
                    <option key={star.value} value={star.value}>{star.label}</option>
                  ))}
                </select>
              </div>

              <div className="filter-sheet-section">
                <label className="filter-sheet-label">Zodiac Sign / Rasi (ராசி)</label>
                <select
                  value={tempFilters.zodiacSign}
                  onChange={(e) => handleFieldChange('zodiacSign', e.target.value)}
                  className="filter-select-input"
                >
                  <option value="all">All 12 Rasis (அனைத்து ராசி)</option>
                  {ZODIAC_SIGNS.map((rasi) => (
                    <option key={rasi.value} value={rasi.value}>{rasi.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="filter-sheet-row">
              <div className="filter-sheet-section">
                <label className="filter-sheet-label">Lagnam (லக்னம்)</label>
                <select
                  value={tempFilters.lagnam}
                  onChange={(e) => handleFieldChange('lagnam', e.target.value)}
                  className="filter-select-input"
                >
                  <option value="all">All 12 Lagnams (அனைத்து லக்னம்)</option>
                  {LAGNAMS.map((lag) => (
                    <option key={lag.value} value={lag.value}>{lag.label}</option>
                  ))}
                </select>
              </div>

              <div className="filter-sheet-section">
                <label className="filter-sheet-label">Dosham (தோஷம்)</label>
                <select
                  value={tempFilters.dosham}
                  onChange={(e) => handleFieldChange('dosham', e.target.value)}
                  className="filter-select-input"
                >
                  {DOSHAM_FILTER_OPTIONS.map((d) => (
                    <option key={d.value} value={d.value}>{d.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="filter-sheet-section">
              <label className="filter-sheet-label">Gothram (கோத்திரம் - Search / Filter)</label>
              <input
                type="text"
                placeholder="e.g. Siva, Vishnu, Kasi, Bharadwaja"
                value={tempFilters.gothram || ''}
                onChange={(e) => handleFieldChange('gothram', e.target.value)}
                className="filter-text-input"
              />
            </div>
          </div>

          {/* GROUP 5: Sorting Order */}
          <div className="filter-sheet-group">
            <h4 className="filter-sheet-group-title">
              <Scroll size={15} />
              <span>Sort Candidates By</span>
            </h4>

            <div className="filter-options-grid">
              {sortOptions.map((opt) => {
                const isSelected = tempFilters.sortBy === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleFieldChange('sortBy', opt.value)}
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

        {/* Filter Modal Footer Actions */}
        <div className="filter-sheet-footer">
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary filter-sheet-reset-btn"
          >
            <RotateCcw size={15} />
            <span>Reset All</span>
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="btn btn-primary filter-sheet-apply-btn"
          >
            <Check size={16} />
            <span>Apply Filters {tempActiveCount > 0 ? `(${tempActiveCount})` : ''}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
