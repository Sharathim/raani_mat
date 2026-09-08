import React from 'react';
import { RegistrationCard } from './RegistrationCard';
import { formatDate } from '../../utils/helpers';
import { REGISTRATION_STATUS } from '../../utils/constants';
import { Trash2, User, Briefcase, Share2, Loader2, Edit } from 'lucide-react';

export function RegistrationTable({
  registrations,
  onStatusChange,
  onDeleteClick,
  onRowClick,
  onShareClick,
  onEditClick,
  sharingId = null
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
              <th style={{ padding: '0.85rem 1rem' }}>Name</th>
              <th style={{ padding: '0.85rem 1rem' }}>Age / Gender</th>
              <th style={{ padding: '0.85rem 1rem' }}>Occupation</th>
              <th style={{ padding: '0.85rem 1rem' }}>Status</th>
              <th style={{ padding: '0.85rem 1rem' }}>Registered Date & Time</th>
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
                {/* Candidate Name & Photo Avatar */}
                <td style={{ padding: '0.75rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '46px',
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
                    <div
                      style={{
                        fontWeight: 700,
                        color: 'var(--ink)',
                        fontSize: '0.925rem'
                      }}
                    >
                      {reg.name || 'Unnamed Candidate'}
                    </div>
                  </div>
                </td>

                {/* Age & Gender */}
                <td style={{ padding: '0.75rem 1rem' }}>
                  <div style={{ fontWeight: 600, color: 'var(--ink)' }}>
                    {reg.age ? `${reg.age} Yrs` : '—'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                    {reg.gender === 'Female' ? 'Bride' : 'Groom'} • {reg.maritalStatus === 'Never Married' ? 'Single' : (reg.maritalStatus || 'Single')}
                  </div>
                </td>

                {/* Occupation */}
                <td style={{ padding: '0.75rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 500, color: 'var(--ink)' }}>
                    <Briefcase size={13} color="var(--maroon-700)" />
                    <span>{reg.occupation || '—'}</span>
                  </div>
                </td>

                {/* Status Dropdown (ONLY Dropdown, No Chip) */}
                <td style={{ padding: '0.75rem 1rem' }} onClick={(e) => e.stopPropagation()}>
                  <select
                    value={reg.status || REGISTRATION_STATUS.NEW}
                    onChange={(e) => onStatusChange(reg.id || reg.registrationId, e.target.value)}
                    style={{
                      padding: '0.35rem 0.6rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--border)',
                      backgroundColor: '#ffffff',
                      color: 'var(--ink)',
                      cursor: 'pointer'
                    }}
                  >
                    <option value={REGISTRATION_STATUS.NEW}>New</option>
                    <option value={REGISTRATION_STATUS.REVIEWED}>Reviewed</option>
                    <option value={REGISTRATION_STATUS.COMPLETED}>Completed</option>
                  </select>
                </td>

                {/* Registered Date & Time */}
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.775rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                  {formatDate(reg.createdAt)}
                </td>

                {/* Row Actions: Edit, Share, Delete */}
                <td style={{ padding: '0.75rem 1rem', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                    <button
                      type="button"
                      onClick={() => onEditClick && onEditClick(reg)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', color: 'var(--maroon-900)' }}
                      title="Edit Candidate Details"
                    >
                      <Edit size={13} />
                      <span style={{ marginLeft: '4px' }}>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onShareClick && onShareClick(reg)}
                      disabled={sharingId === (reg.id || reg.registrationId)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', color: '#25D366' }}
                      title="Share via WhatsApp"
                    >
                      {sharingId === (reg.id || reg.registrationId) ? (
                        <Loader2 size={13} className="spin" />
                      ) : (
                        <Share2 size={13} />
                      )}
                      <span style={{ marginLeft: '4px' }}>Share</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteClick(reg)}
                      className="btn btn-danger btn-sm"
                      style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                      title="Delete profile"
                    >
                      <Trash2 size={13} />
                      <span style={{ marginLeft: '4px' }}>Delete</span>
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
            onShareClick={onShareClick}
            onEditClick={onEditClick}
            isSharing={sharingId === (reg.id || reg.registrationId)}
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
