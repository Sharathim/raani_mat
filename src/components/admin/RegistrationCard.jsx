import React from 'react';
import { formatDate } from '../../utils/helpers';
import { REGISTRATION_STATUS } from '../../utils/constants';
import { User, Briefcase, Trash2, Calendar, Share2, Loader2, Edit } from 'lucide-react';

export function RegistrationCard({
  registration,
  onStatusChange,
  onDeleteClick,
  onClick,
  onShareClick,
  onEditClick,
  isSharing = false
}) {
  if (!registration) return null;

  const demographics = [
    registration.age ? `${registration.age} Yrs` : null,
    registration.gender === 'Female' ? 'Bride' : 'Groom',
    registration.maritalStatus === 'Never Married' ? 'Single' : (registration.maritalStatus || 'Single')
  ].filter(Boolean).join(' • ');

  return (
    <div
      className="admin-candidate-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick();
        }
      }}
    >
      {/* Top Header Row: Photo + Primary Identity */}
      <div className="admin-card-header">
        {/* Profile Photo Thumbnail */}
        <div className="admin-card-photo-wrap">
          {registration.photoUrl ? (
            <img
              src={registration.photoUrl}
              alt={registration.name || 'Candidate Photo'}
              className="admin-card-photo"
              loading="lazy"
            />
          ) : (
            <div className="admin-card-photo-fallback">
              <User size={24} />
            </div>
          )}
        </div>

        {/* Candidate Identity */}
        <div className="admin-card-identity">
          <h3 className="admin-card-name" style={{ margin: 0, fontSize: '1.05rem', color: 'var(--maroon-950)', fontWeight: 700 }}>
            {registration.name || 'Unnamed Candidate'}
          </h3>

          {/* Age • Gender • Marital Status (e.g. 20 Yrs • Groom • Single) */}
          <div className="admin-card-demographics" style={{ marginTop: '0.2rem', fontSize: '0.825rem', color: 'var(--maroon-800)', fontWeight: 600 }}>
            {demographics}
          </div>

          {/* Occupation below demographics */}
          <div className="admin-card-occupation" style={{ marginTop: '0.25rem', fontSize: '0.825rem', color: 'var(--ink)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Briefcase size={13} color="var(--maroon-700)" style={{ flexShrink: 0 }} />
            <span>{registration.occupation || 'Occupation not specified'}</span>
          </div>
        </div>
      </div>

      {/* Card Footer: Action Controls (Same Line) & Date Below */}
      <div
        className="admin-card-footer"
        style={{ marginTop: '0.75rem', paddingTop: '0.65rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Same Line Action Row: Status + Edit + Share + Delete */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', width: '100%' }}>
          {/* Status Dropdown */}
          <select
            className="admin-card-select-status"
            value={registration.status || REGISTRATION_STATUS.NEW}
            onChange={(e) => onStatusChange(registration.id || registration.registrationId, e.target.value)}
            aria-label="Update candidate status"
            style={{ flex: 1, height: '36px', minWidth: '110px' }}
          >
            <option value={REGISTRATION_STATUS.NEW}>New</option>
            <option value={REGISTRATION_STATUS.REVIEWED}>Reviewed</option>
            <option value={REGISTRATION_STATUS.COMPLETED}>Completed</option>
          </select>

          {/* Action Icon Buttons: Edit, Share, Delete */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0 }}>
            {/* Edit Button (Icon Only) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEditClick && onEditClick(registration);
              }}
              className="btn btn-secondary btn-sm"
              style={{
                width: '36px',
                height: '36px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--maroon-900)'
              }}
              title="Edit Profile"
              aria-label="Edit candidate profile"
            >
              <Edit size={16} />
            </button>

            {/* Share Button (Icon Only) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onShareClick && onShareClick(registration);
              }}
              disabled={isSharing}
              className="btn btn-secondary btn-sm"
              style={{
                width: '36px',
                height: '36px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-sm)',
                color: '#15803d',
                borderColor: '#bbf7d0'
              }}
              title="Share via WhatsApp"
              aria-label="Share profile via WhatsApp"
            >
              {isSharing ? <Loader2 size={16} className="spin" /> : <Share2 size={16} />}
            </button>

            {/* Delete Button (Icon Only) */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteClick(registration);
              }}
              className="btn btn-secondary btn-sm"
              style={{
                width: '36px',
                height: '36px',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--danger)',
                borderColor: 'var(--danger-border)',
                background: 'var(--danger-bg)'
              }}
              title="Delete Profile"
              aria-label="Delete profile"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Registered Date & Time Pushed Below */}
        <div className="admin-card-registered-date" style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Calendar size={12} />
          <span>Registered: {formatDate(registration.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
