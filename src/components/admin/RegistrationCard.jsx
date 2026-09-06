import React from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../common/StatusBadge';
import { formatDate } from '../../utils/helpers';
import { REGISTRATION_STATUS } from '../../utils/constants';
import { User, Phone, MapPin, Briefcase, Eye, Trash2, Calendar, ExternalLink } from 'lucide-react';

export function RegistrationCard({
  registration,
  onStatusChange,
  onDeleteClick,
  onClick
}) {
  return (
    <div
      className="card-clean registration-card"
      onClick={onClick}
      style={{
        padding: '1rem',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        border: '1px solid var(--border)',
        cursor: 'pointer'
      }}
    >
      <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
        {/* Photo Thumbnail */}
        <div
          style={{
            width: '56px',
            height: '68px',
            borderRadius: 'var(--radius-sm)',
            border: '1.5px solid var(--border)',
            overflow: 'hidden',
            flexShrink: 0,
            backgroundColor: 'var(--cream)'
          }}
        >
          {registration.photoUrl ? (
            <img
              src={registration.photoUrl}
              alt={registration.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
              <User size={20} />
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.4rem', flexWrap: 'wrap' }}>
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--ink)',
                margin: 0,
                lineHeight: 1.2
              }}
            >
              {registration.name || 'Unnamed Candidate'}
            </h4>
            <StatusBadge status={registration.status} />
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--maroon-800)', fontWeight: 600, marginTop: '2px' }}>
            {registration.age ? `${registration.age} Yrs` : ''} • {registration.gender === 'Female' ? 'Bride' : 'Groom'} • {registration.maritalStatus || 'Unmarried'}
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '2px' }}>
            ID: <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{registration.registrationId || registration.id}</span>
          </div>
        </div>
      </div>

      {/* Meta Grid */}
      <div className="registration-card-meta" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', fontSize: '0.775rem', background: 'var(--surface-alt)', padding: '0.5rem 0.65rem', borderRadius: 'var(--radius-xs)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <MapPin size={12} color="var(--maroon-700)" />
          <span>{registration.location || '—'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <Phone size={12} color="var(--maroon-700)" />
          <span>{registration.phone || '—'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', gridColumn: '1 / -1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <Briefcase size={12} color="var(--maroon-700)" />
          <span>{registration.occupation} • {registration.education}</span>
        </div>
      </div>

      {/* Actions */}
      <div
        className="registration-card-actions"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', paddingTop: '0.4rem', borderTop: '1px solid var(--border-subtle)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: '0.7rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
          <Calendar size={11} />
          <span>{formatDate(registration.createdAt)}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <button
            type="button"
            onClick={onClick}
            className="btn btn-secondary btn-sm registration-preview-btn"
            style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
            title="Quick Preview"
          >
            <Eye size={12} />
            <span>Preview</span>
          </button>

          <select
            value={registration.status || REGISTRATION_STATUS.NEW}
            onChange={(e) => onStatusChange(registration.id || registration.registrationId, e.target.value)}
            style={{
              padding: '0.2rem 0.4rem',
              fontSize: '0.75rem',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border)',
              backgroundColor: '#ffffff'
            }}
          >
            <option value={REGISTRATION_STATUS.NEW}>New</option>
            <option value={REGISTRATION_STATUS.CONTACTED}>Contacted</option>
            <option value={REGISTRATION_STATUS.SHORTLISTED}>Shortlisted</option>
            <option value={REGISTRATION_STATUS.CLOSED}>Closed</option>
          </select>

          <Link
            to={`/admin/registrations/${registration.id || registration.registrationId}`}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
          >
            <ExternalLink size={12} />
          </Link>

          <button
            type="button"
            onClick={() => onDeleteClick(registration)}
            className="btn btn-danger btn-sm"
            style={{ padding: '0.2rem 0.45rem', fontSize: '0.75rem' }}
            title="Delete profile"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
