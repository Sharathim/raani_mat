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
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.85rem 1rem',
        backgroundColor: 'var(--cream)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        marginBottom: '1.25rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--maroon-900)', fontWeight: 600, fontSize: '0.85rem' }}>
        <Filter size={15} />
        <span>வடிகட்டி (Filter):</span>
      </div>

      {/* Status Filter */}
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        style={{
          padding: '0.4rem 0.75rem',
          borderRadius: 'var(--radius-xs)',
          border: '1px solid var(--line)',
          backgroundColor: '#ffffff',
          fontSize: '0.85rem',
          color: 'var(--ink)'
        }}
      >
        <option value="all">அனைத்து நிலைகளும் (All Status)</option>
        <option value={REGISTRATION_STATUS.NEW}>புதியது (New)</option>
        <option value={REGISTRATION_STATUS.CONTACTED}>தொடர்பு கொள்ளப்பட்டது (Contacted)</option>
        <option value={REGISTRATION_STATUS.SHORTLISTED}>பரிசீலனையில் (Shortlisted)</option>
        <option value={REGISTRATION_STATUS.CLOSED}>நிறைவுற்றது (Closed)</option>
      </select>

      {/* Gender Filter */}
      <select
        value={genderFilter}
        onChange={(e) => onGenderChange(e.target.value)}
        style={{
          padding: '0.4rem 0.75rem',
          borderRadius: 'var(--radius-xs)',
          border: '1px solid var(--line)',
          backgroundColor: '#ffffff',
          fontSize: '0.85rem',
          color: 'var(--ink)'
        }}
      >
        <option value="all">அனைத்து பாலினம் (All Genders)</option>
        <option value="Female">பெண் வரன் (Bride)</option>
        <option value="Male">ஆண் வரன் (Groom)</option>
      </select>

      {/* Photo Filter */}
      <select
        value={photoFilter}
        onChange={(e) => onPhotoChange(e.target.value)}
        style={{
          padding: '0.4rem 0.75rem',
          borderRadius: 'var(--radius-xs)',
          border: '1px solid var(--line)',
          backgroundColor: '#ffffff',
          fontSize: '0.85rem',
          color: 'var(--ink)'
        }}
      >
        <option value="all">புகைப்படம்: அனைத்தும் (All)</option>
        <option value="withPhoto">புகைப்படம் உள்ளவை (With Photo)</option>
        <option value="noPhoto">புகைப்படம் இல்லாதவை (Without Photo)</option>
      </select>

      {/* Sort By Dropdown */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <ArrowUpDown size={15} color="var(--maroon-700)" />
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          style={{
            padding: '0.4rem 0.75rem',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--line)',
            backgroundColor: '#ffffff',
            fontSize: '0.85rem',
            fontWeight: 500,
            color: 'var(--maroon-950)'
          }}
        >
          <option value="newest">புதிய பதிவு முதலில் (Newest First)</option>
          <option value="oldest">பழைய பதிவு முதலில் (Oldest First)</option>
          <option value="nameAsc">பெயர் A–Z (Name A–Z)</option>
          <option value="nameDesc">பெயர் Z–A (Name Z–A)</option>
        </select>
      </div>
    </div>
  );
}
