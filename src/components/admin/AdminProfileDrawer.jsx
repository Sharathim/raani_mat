import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StatusBadge } from '../common/StatusBadge';
import { formatDate } from '../../utils/helpers';
import { REGISTRATION_STATUS, STATUS_CONFIG } from '../../utils/constants';
import {
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  HeartHandshake,
  Briefcase,
  GraduationCap,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Clock,
  Printer,
  Trash2
} from 'lucide-react';

export function AdminProfileDrawer({
  registration,
  isOpen,
  onClose,
  onStatusChange,
  onDeleteClick
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !registration) return null;

  const cleanPhone = (registration.phone || '').replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
    `Hello ${registration.name || ''}, greetings from Rani Thirumana Sevai Maiyam regarding your matrimonial profile.`
  )}`;

  return (
    <div className="drawer-backdrop" onClick={onClose} aria-modal="true" role="dialog">
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#ffffff',
            position: 'sticky',
            top: 0,
            zIndex: 10
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '0.85rem',
                color: 'var(--maroon-800)',
                background: 'var(--maroon-50)',
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-xs)',
                border: '1px solid rgba(138, 16, 38, 0.15)'
              }}
            >
              {registration.registrationId || registration.id}
            </span>
            <StatusBadge status={registration.status} />
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--muted)',
              cursor: 'pointer',
              padding: '0.35rem',
              borderRadius: 'var(--radius-xs)',
              display: 'flex',
              alignItems: 'center'
            }}
            aria-label="Close drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Identity & Photo Summary Card */}
          <div
            style={{
              display: 'flex',
              gap: '1.25rem',
              alignItems: 'center',
              background: 'var(--surface-alt)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border)'
            }}
          >
            <div
              style={{
                width: '84px',
                height: '105px',
                borderRadius: 'var(--radius-sm)',
                border: '2px solid var(--gold-500)',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                flexShrink: 0
              }}
            >
              {registration.photoUrl ? (
                <img
                  src={registration.photoUrl}
                  alt={registration.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--muted)'
                  }}
                >
                  <User size={32} />
                  <span style={{ fontSize: '0.65rem' }}>No Photo</span>
                </div>
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '0.2rem', lineHeight: 1.2 }}>
                {registration.name || 'Unnamed Candidate'}
              </h3>
              <div style={{ fontSize: '0.875rem', color: 'var(--maroon-800)', fontWeight: 600, marginBottom: '0.5rem' }}>
                {registration.age ? `${registration.age} Yrs` : ''} • {registration.gender === 'Female' ? 'Bride' : 'Groom'} • {registration.maritalStatus || 'Unmarried'}
              </div>

              {/* Status Selector Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 500 }}>Status:</span>
                <select
                  value={registration.status || REGISTRATION_STATUS.NEW}
                  onChange={(e) => onStatusChange(registration.id, e.target.value)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.8rem',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid var(--border)',
                    backgroundColor: '#ffffff',
                    fontWeight: 600,
                    color: 'var(--ink)'
                  }}
                >
                  <option value={REGISTRATION_STATUS.NEW}>New</option>
                  <option value={REGISTRATION_STATUS.CONTACTED}>Contacted</option>
                  <option value={REGISTRATION_STATUS.SHORTLISTED}>Shortlisted</option>
                  <option value={REGISTRATION_STATUS.CLOSED}>Closed / Married</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Contact Action Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            {cleanPhone ? (
              <a
                href={`tel:${cleanPhone}`}
                className="btn btn-primary btn-sm"
                style={{ justifyContent: 'center' }}
              >
                <Phone size={14} />
                <span>Call {registration.phone}</span>
              </a>
            ) : (
              <button className="btn btn-secondary btn-sm" disabled>
                <Phone size={14} /> No Phone
              </button>
            )}

            {cleanPhone ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
                style={{ justifyContent: 'center', color: '#15803d', borderColor: '#86efac' }}
              >
                <MessageCircle size={14} color="#15803d" />
                <span>WhatsApp</span>
              </a>
            ) : (
              <button className="btn btn-secondary btn-sm" disabled>
                <MessageCircle size={14} /> WhatsApp
              </button>
            )}
          </div>

          {/* Details Section 1: Basic & Social */}
          <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
            <h4 style={{ fontSize: '0.875rem', color: 'var(--maroon-900)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <User size={15} />
              <span>Basic & Social Details</span>
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Profile For:</span>
                <strong>{registration.profileFor || 'Self'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Date of Birth:</span>
                <strong>{registration.dateOfBirth || '—'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Religion / Caste:</span>
                <strong>{registration.casteReligion || '—'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Location:</span>
                <strong>{registration.location || '—'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Native Place:</span>
                <strong>{registration.nativePlace || '—'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Email:</span>
                <strong>{registration.email || '—'}</strong>
              </div>
            </div>
          </div>

          {/* Details Section 2: Family */}
          <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
            <h4 style={{ fontSize: '0.875rem', color: 'var(--maroon-900)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem' }}>
              Family Information
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Father Name:</span>
                <strong>{registration.fatherName || '—'}</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{registration.fatherOccupation}</span>
              </div>
              <div>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Mother Name:</span>
                <strong>{registration.motherName || '—'}</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{registration.motherOccupation}</span>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Siblings:</span>
                <p style={{ margin: 0 }}>{registration.siblings || 'None'}</p>
              </div>
            </div>
          </div>

          {/* Details Section 3: Birth & Horoscope */}
          <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
            <h4 style={{ fontSize: '0.875rem', color: 'var(--maroon-900)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={15} />
              <span>Horoscope & Astrology</span>
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Birth Star (Nakshatra):</span>
                <strong style={{ color: 'var(--maroon-900)' }}>{registration.birthStar || '—'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Zodiac Sign (Rasi):</span>
                <strong style={{ color: 'var(--maroon-900)' }}>{registration.zodiacSign || '—'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Lagnam:</span>
                <strong>{registration.lagnam || '—'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Gothram / Dosham:</span>
                <strong>{registration.gothram || '—'} ({registration.dosham || 'None'})</strong>
              </div>
            </div>
          </div>

          {/* Details Section 4: Career & Income */}
          <div style={{ background: '#ffffff', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
            <h4 style={{ fontSize: '0.875rem', color: 'var(--maroon-900)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Briefcase size={15} />
              <span>Education & Career</span>
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Height:</span>
                <strong>{registration.height || '—'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Monthly Income:</span>
                <strong>{registration.income || '—'}</strong>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Education:</span>
                <strong>{registration.education || '—'}</strong>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <span style={{ color: 'var(--muted)', display: 'block', fontSize: '0.75rem' }}>Occupation & Sector:</span>
                <strong>{registration.occupation || '—'} ({registration.employedIn || 'Private'})</strong>
              </div>
            </div>
          </div>

          {/* Details Section 5: Expectations */}
          <div style={{ background: 'var(--gold-50)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
            <h4 style={{ fontSize: '0.875rem', color: 'var(--maroon-900)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <HeartHandshake size={15} />
              <span>Partner Expectations</span>
            </h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--ink)', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
              {registration.expectation || 'No specific expectations mentioned.'}
            </p>
          </div>

          {/* Registration Metadata */}
          <div style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'flex', justifyContent: 'space-between', padding: '0 0.5rem' }}>
            <span>Registered: {formatDate(registration.createdAt)}</span>
            <span>ID: {registration.registrationId || registration.id}</span>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div
          style={{
            padding: '1rem 1.5rem',
            borderTop: '1px solid var(--border)',
            backgroundColor: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            bottom: 0,
            zIndex: 10
          }}
        >
          <button
            type="button"
            onClick={() => onDeleteClick(registration)}
            className="btn btn-danger btn-sm"
            title="Delete this profile"
          >
            <Trash2 size={14} />
            <span>Delete Profile</span>
          </button>

          <Link
            to={`/admin/registrations/${registration.id}`}
            className="btn btn-primary btn-sm"
          >
            <span>Full Bio-Data Page</span>
            <ExternalLink size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
