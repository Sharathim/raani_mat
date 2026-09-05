import React from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../common/StatusBadge';
import { RegistrationCard } from './RegistrationCard';
import { formatDate } from '../../utils/helpers';
import { REGISTRATION_STATUS } from '../../utils/constants';
import { Eye, Trash2, User, Phone, MapPin } from 'lucide-react';

export function RegistrationTable({
  registrations,
  onStatusChange,
  onDeleteClick
}) {
  return (
    <div>
      {/* Desktop Table View */}
      <div
        className="registration-table-desktop card-ornate"
        style={{
          overflowX: 'auto',
          backgroundColor: 'var(--paper)',
          borderRadius: 'var(--radius-md)'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr
              style={{
                backgroundColor: 'var(--maroon-900)',
                color: 'var(--gold-100)',
                borderBottom: '2px solid var(--gold-500)'
              }}
            >
              <th style={{ padding: '0.85rem 1rem', width: '60px' }}>படம் (Photo)</th>
              <th style={{ padding: '0.85rem 1rem' }}>பெயர் / பதிவு எண் (Name & ID)</th>
              <th style={{ padding: '0.85rem 1rem' }}>வயது / பாலினம் (Age/Gender)</th>
              <th style={{ padding: '0.85rem 1rem' }}>ஊர் / சமூகம் (Location/Caste)</th>
              <th style={{ padding: '0.85rem 1rem' }}>கல்வி & தொழில் (Career)</th>
              <th style={{ padding: '0.85rem 1rem' }}>நிலை (Status)</th>
              <th style={{ padding: '0.85rem 1rem' }}>பதிவு தேதி (Date)</th>
              <th style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>செயல் (Actions)</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg, index) => (
              <tr
                key={reg.id}
                style={{
                  borderBottom: '1px solid var(--line)',
                  backgroundColor: index % 2 === 0 ? '#ffffff' : 'var(--cream)',
                  transition: 'background-color 0.15s ease'
                }}
              >
                {/* Photo */}
                <td style={{ padding: '0.75rem 1rem' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '56px',
                      borderRadius: 'var(--radius-xs)',
                      border: '1.5px solid var(--gold-500)',
                      overflow: 'hidden',
                      backgroundColor: 'var(--cream)'
                    }}
                  >
                    {reg.photoUrl ? (
                      <img
                        src={reg.photoUrl}
                        alt={reg.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
                        <User size={18} />
                      </div>
                    )}
                  </div>
                </td>

                {/* Name & ID */}
                <td style={{ padding: '0.75rem 1rem' }}>
                  <Link
                    to={`/admin/registrations/${reg.id}`}
                    className="font-tamil-serif"
                    style={{
                      fontWeight: 700,
                      color: 'var(--maroon-900)',
                      fontSize: '1rem',
                      display: 'block'
                    }}
                  >
                    {reg.name}
                  </Link>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '2px' }}>
                    ID: <span style={{ fontWeight: 600, color: 'var(--maroon-800)' }}>{reg.registrationId || reg.id}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--ink)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Phone size={12} color="var(--maroon-700)" />
                    <span>{reg.phone}</span>
                  </div>
                </td>

                {/* Age & Gender */}
                <td style={{ padding: '0.75rem 1rem' }}>
                  <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{reg.age} Yrs</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                    {reg.gender === 'Female' ? 'Bride (பெண்)' : 'Groom (ஆண்)'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted-light)' }}>
                    {reg.maritalStatus}
                  </div>
                </td>

                {/* Location & Caste */}
                <td style={{ padding: '0.75rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 500 }}>
                    <MapPin size={13} color="var(--maroon-700)" />
                    <span>{reg.location || '—'}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '2px' }}>
                    {reg.casteReligion || '—'}
                  </div>
                </td>

                {/* Career */}
                <td style={{ padding: '0.75rem 1rem', maxWidth: '200px' }}>
                  <div style={{ fontWeight: 600, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {reg.occupation || '—'}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {reg.education || '—'}
                  </div>
                </td>

                {/* Status Dropdown */}
                <td style={{ padding: '0.75rem 1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    <StatusBadge status={reg.status} />
                    <select
                      value={reg.status || REGISTRATION_STATUS.NEW}
                      onChange={(e) => onStatusChange(reg.id, e.target.value)}
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
                  </div>
                </td>

                {/* Registered On */}
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                  {formatDate(reg.createdAt)}
                </td>

                {/* Actions */}
                <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                    <Link
                      to={`/admin/registrations/${reg.id}`}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.35rem 0.6rem', fontSize: '0.8rem' }}
                      title="View Full Profile"
                    >
                      <Eye size={14} />
                      <span>விவரம்</span>
                    </Link>
                    <button
                      type="button"
                      onClick={() => onDeleteClick(reg)}
                      className="btn btn-danger btn-sm"
                      style={{ padding: '0.35rem 0.5rem', fontSize: '0.8rem' }}
                      title="Delete profile"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Cards View */}
      <div className="registration-table-mobile" style={{ display: 'none' }}>
        {registrations.map((reg) => (
          <RegistrationCard
            key={reg.id}
            registration={reg}
            onStatusChange={onStatusChange}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 960px) {
          .registration-table-desktop {
            display: none !important;
          }
          .registration-table-mobile {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
