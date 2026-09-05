import React from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../common/StatusBadge';
import { RegistrationCard } from './RegistrationCard';
import { formatDate } from '../../utils/helpers';
import { REGISTRATION_STATUS } from '../../utils/constants';
import { Eye, Trash2, User, Phone, MapPin, ExternalLink } from 'lucide-react';

export function RegistrationTable({
  registrations,
  onStatusChange,
  onDeleteClick,
  onRowClick
}) {
  return (
    <div>
      {/* Desktop SaaS Data Table */}
      <div
        className="registration-table-desktop card-clean"
        style={{
          overflowX: 'auto',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr
              style={{
                backgroundColor: 'var(--surface-alt)',
                color: 'var(--muted)',
                borderBottom: '1px solid var(--border)',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                letterSpacing: '0.5px'
              }}
            >
              <th style={{ padding: '0.85rem 1rem', width: '56px' }}>Photo</th>
              <th style={{ padding: '0.85rem 1rem' }}>Candidate / ID</th>
              <th style={{ padding: '0.85rem 1rem' }}>Age / Gender</th>
              <th style={{ padding: '0.85rem 1rem' }}>Location & Caste</th>
              <th style={{ padding: '0.85rem 1rem' }}>Education & Career</th>
              <th style={{ padding: '0.85rem 1rem' }}>Status</th>
              <th style={{ padding: '0.85rem 1rem' }}>Registered</th>
              <th style={{ padding: '0.85rem 1rem', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg, index) => (
              <tr
                key={reg.id || reg.registrationId || index}
                onClick={() => onRowClick && onRowClick(reg)}
                style={{
                  borderBottom: '1px solid var(--border-subtle)',
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafaf8',
                  transition: 'background-color 0.15s ease',
                  cursor: 'pointer'
                }}
              >
                {/* Photo Avatar */}
                <td style={{ padding: '0.65rem 1rem' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '52px',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--border)',
                      overflow: 'hidden',
                      backgroundColor: 'var(--cream)',
                      flexShrink: 0
                    }}
                  >
                    {reg.photoUrl ? (
                      <img
                        src={reg.photoUrl}
                        alt={reg.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--muted)'
                        }}
                      >
                        <User size={18} />
                      </div>
                    )}
                  </div>
                </td>

                {/* Candidate Name & ID */}
                <td style={{ padding: '0.65rem 1rem' }}>
                  <div
                    style={{
                      fontWeight: 700,
                      color: 'var(--ink)',
                      fontSize: '0.925rem'
                    }}
                  >
                    {reg.name || 'Unnamed Candidate'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--maroon-800)', fontWeight: 600, marginTop: '2px' }}>
                    {reg.registrationId || reg.id}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Phone size={11} />
                    <span>{reg.phone || 'No phone'}</span>
                  </div>
                </td>

                {/* Age & Gender */}
                <td style={{ padding: '0.65rem 1rem' }}>
                  <div style={{ fontWeight: 600, color: 'var(--ink)' }}>
                    {reg.age ? `${reg.age} Yrs` : '—'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                    {reg.gender === 'Female' ? 'Bride' : 'Groom'}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted-light)' }}>
                    {reg.maritalStatus || 'Unmarried'}
                  </div>
                </td>

                {/* Location & Caste */}
                <td style={{ padding: '0.65rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 500, color: 'var(--ink)' }}>
                    <MapPin size={12} color="var(--maroon-700)" />
                    <span>{reg.location || '—'}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '2px' }}>
                    {reg.casteReligion || '—'}
                  </div>
                </td>

                {/* Career & Education */}
                <td style={{ padding: '0.65rem 1rem', maxWidth: '180px' }}>
                  <div style={{ fontWeight: 600, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {reg.occupation || '—'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {reg.education || '—'}
                  </div>
                </td>

                {/* Status Dropdown */}
                <td style={{ padding: '0.65rem 1rem' }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <StatusBadge status={reg.status} />
                    <select
                      value={reg.status || REGISTRATION_STATUS.NEW}
                      onChange={(e) => onStatusChange(reg.id || reg.registrationId, e.target.value)}
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

                {/* Registered Date */}
                <td style={{ padding: '0.65rem 1rem', fontSize: '0.75rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                  {formatDate(reg.createdAt)}
                </td>

                {/* Row Actions */}
                <td style={{ padding: '0.65rem 1rem', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                    <button
                      type="button"
                      onClick={() => onRowClick && onRowClick(reg)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.3rem 0.55rem', fontSize: '0.75rem' }}
                      title="Quick Preview"
                    >
                      <Eye size={13} />
                      <span>Preview</span>
                    </button>

                    <Link
                      to={`/admin/registrations/${reg.id || reg.registrationId}`}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.3rem 0.45rem', fontSize: '0.75rem' }}
                      title="Full Bio-Data Page"
                    >
                      <ExternalLink size={13} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => onDeleteClick(reg)}
                      className="btn btn-danger btn-sm"
                      style={{ padding: '0.3rem 0.45rem', fontSize: '0.75rem' }}
                      title="Delete profile"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked SaaS Cards */}
      <div className="registration-table-mobile" style={{ display: 'none' }}>
        {registrations.map((reg) => (
          <RegistrationCard
            key={reg.id || reg.registrationId}
            registration={reg}
            onStatusChange={onStatusChange}
            onDeleteClick={onDeleteClick}
            onClick={() => onRowClick && onRowClick(reg)}
          />
        ))}
      </div>

      <style>{`
        @media (max-width: 960px) {
          .registration-table-desktop {
            display: none !important;
          }
          .registration-table-mobile {
            display: flex !important;
            flex-direction: column;
            gap: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}
