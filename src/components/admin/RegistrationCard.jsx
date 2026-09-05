import React from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../common/StatusBadge';
import { formatDate } from '../../utils/helpers';
import { REGISTRATION_STATUS } from '../../utils/constants';
import { User, Phone, MapPin, Briefcase, Eye, Trash2, Calendar } from 'lucide-react';

export function RegistrationCard({
  registration,
  onStatusChange,
  onDeleteClick
}) {
  return (
    <div
      className="card-ornate"
      style={{
        padding: '1.25rem',
        marginBottom: '1rem',
        backgroundColor: 'var(--paper)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem'
      }}
    >
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        {/* Photo Thumbnail */}
        <div
          style={{
            width: '64px',
            height: '76px',
            borderRadius: 'var(--radius-sm)',
            border: '2px solid var(--gold-500)',
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
              <User size={24} />
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Link
              to={`/admin/registrations/${registration.id}`}
              className="font-tamil-serif"
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: 'var(--maroon-900)',
                textDecoration: 'none'
              }}
            >
              {registration.name}
            </Link>
            <StatusBadge status={registration.status} />
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--maroon-800)', fontWeight: 600, marginTop: '2px' }}>
            {registration.age} Yrs • {registration.gender === 'Female' ? 'Bride (பெண்)' : 'Groom (ஆண்)'} • {registration.maritalStatus}
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '2px' }}>
            ID: <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{registration.registrationId || registration.id}</span>
          </div>
        </div>
      </div>

      {/* Meta Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem', background: 'var(--cream)', padding: '0.65rem', borderRadius: 'var(--radius-xs)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <MapPin size={13} color="var(--maroon-700)" />
          <span>{registration.location || '—'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <Phone size={13} color="var(--maroon-700)" />
          <a href={`tel:${registration.phone}`} style={{ color: 'var(--ink)', textDecoration: 'none' }}>
            {registration.phone || '—'}
          </a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', gridColumn: '1 / -1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <Briefcase size={13} color="var(--maroon-700)" />
          <span>{registration.education} — {registration.occupation}</span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--line)' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <Calendar size={12} />
          <span>{formatDate(registration.createdAt)}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <select
            value={registration.status || REGISTRATION_STATUS.NEW}
            onChange={(e) => onStatusChange(registration.id, e.target.value)}
            style={{
              padding: '0.25rem 0.5rem',
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
            to={`/admin/registrations/${registration.id}`}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
          >
            <Eye size={13} /> View
          </Link>

          <button
            type="button"
            onClick={() => onDeleteClick(registration)}
            className="btn btn-danger btn-sm"
            style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
            title="Delete profile"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
