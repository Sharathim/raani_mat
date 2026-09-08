import React from 'react';
import { StatusBadge } from '../common/StatusBadge';
import { formatDate } from '../../utils/helpers';
import { REGISTRATION_STATUS } from '../../utils/constants';
import { User, Phone, MapPin, Briefcase, Eye, Trash2, Calendar, Share2, Loader2 } from 'lucide-react';

export function RegistrationCard({
  registration,
  onStatusChange,
  onDeleteClick,
  onClick,
  onShareClick,
  isSharing = false
}) {
  if (!registration) return null;

  const demographics = [
    registration.age ? `${registration.age} Yrs` : null,
    registration.gender === 'Female' ? 'Bride' : 'Groom',
    registration.maritalStatus || 'Never Married'
  ].filter(Boolean).join(' • ');

  const careerInfo = [registration.occupation, registration.education].filter(Boolean).join(' • ');

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
          <div className="admin-card-name-row">
            <h3 className="admin-card-name">
              {registration.name || 'Unnamed Candidate'}
            </h3>
            <StatusBadge status={registration.status} />
          </div>

          {/* Age • Gender • Marital Status */}
          <div className="admin-card-demographics">
            {demographics}
          </div>

          {/* Registration ID (Subtle) */}
          <div className="admin-card-id-pill">
            <span>ID:</span>
            <strong>{registration.registrationId || registration.id}</strong>
          </div>
        </div>
      </div>

      {/* Metadata Grid (Location, Phone, Career) */}
      <div className="admin-card-meta-grid">
        <div className="admin-card-meta-item" title="Candidate Location">
          <MapPin size={13} color="var(--maroon-700)" style={{ flexShrink: 0 }} />
          <span>{registration.location || 'Location not specified'}</span>
        </div>

        <div className="admin-card-meta-item" title="Contact Phone">
          <Phone size={13} color="var(--maroon-700)" style={{ flexShrink: 0 }} />
          <span>{registration.phone || '—'}</span>
        </div>

        {careerInfo && (
          <div className="admin-card-meta-item full-width" title="Career & Education">
            <Briefcase size={13} color="var(--maroon-700)" style={{ flexShrink: 0 }} />
            <span>{careerInfo}</span>
          </div>
        )}
      </div>

      {/* Card Footer: Registration Date & Controls */}
      <div
        className="admin-card-footer"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Registration Date */}
        <div className="admin-card-registered-date">
          <Calendar size={12} />
          <span>Registered: {formatDate(registration.createdAt)}</span>
        </div>

        {/* Action Controls */}
        <div className="admin-card-controls">
          {/* Status Dropdown */}
          <select
            className="admin-card-select-status"
            value={registration.status || REGISTRATION_STATUS.NEW}
            onChange={(e) => onStatusChange(registration.id || registration.registrationId, e.target.value)}
            aria-label="Update candidate status"
          >
            <option value={REGISTRATION_STATUS.NEW}>New</option>
            <option value={REGISTRATION_STATUS.REVIEWED}>Reviewed</option>
            <option value={REGISTRATION_STATUS.COMPLETED}>Completed</option>
          </select>

          {/* Primary Utility Action: Quick Preview */}
          <button
            type="button"
            onClick={onClick}
            className="btn btn-primary btn-sm"
            style={{
              padding: '0.3rem 0.7rem',
              fontSize: '0.775rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontWeight: 600
            }}
            title="Quick Preview Profile"
          >
            <Eye size={13} />
            <span>Preview</span>
          </button>

          {/* Secondary Action: WhatsApp Share */}
          <button
            type="button"
            onClick={() => onShareClick && onShareClick(registration)}
            disabled={isSharing}
            className="btn btn-secondary btn-sm"
            style={{
              padding: '0.3rem 0.6rem',
              fontSize: '0.775rem',
              color: '#15803d',
              borderColor: '#bbf7d0',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontWeight: 600
            }}
            title="Share Profile via WhatsApp"
            aria-label="Share Profile via WhatsApp"
          >
            {isSharing ? <Loader2 size={13} className="spin" /> : <Share2 size={13} />}
          </button>

          {/* Destructive Action: Delete */}
          <button
            type="button"
            onClick={() => onDeleteClick(registration)}
            className="btn btn-secondary btn-sm"
            style={{
              padding: '0.3rem 0.5rem',
              color: 'var(--danger)',
              borderColor: 'transparent',
              background: 'transparent'
            }}
            title="Delete candidate profile"
            aria-label="Delete profile"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
