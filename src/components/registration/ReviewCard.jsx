import React from 'react';
import { User, Phone, MapPin, Briefcase, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';
import { OrnateCorner } from '../common/DecorativeElements';

export function ReviewCard({ formData, onConsentToggle, isSubmitting }) {
  return (
    <div
      className="card-clean"
      style={{
        padding: '2rem 1.5rem',
        marginBottom: '1.75rem',
        backgroundColor: '#ffffff',
        border: '1px solid var(--border)',
        position: 'relative'
      }}
    >
      <OrnateCorner position="top-left" />
      <OrnateCorner position="top-right" />

      <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <h3 style={{ color: 'var(--maroon-950)', fontSize: '1.35rem', margin: '0 0 0.25rem' }}>
          Profile Review & Verification
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>
          Please review the entered information carefully before final submission.
        </p>
      </div>

      {/* Candidate Header Summary */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.25rem',
          alignItems: 'center',
          background: 'var(--surface-alt)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          marginBottom: '1.5rem'
        }}
      >
        {formData.photoUrl ? (
          <div
            style={{
              width: '90px',
              height: '112px',
              borderRadius: 'var(--radius-sm)',
              border: '2px solid var(--gold-500)',
              overflow: 'hidden',
              flexShrink: 0
            }}
          >
            <img
              src={formData.photoUrl}
              alt={formData.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ) : (
          <div
            style={{
              width: '90px',
              height: '112px',
              borderRadius: 'var(--radius-sm)',
              border: '1px dashed var(--border)',
              backgroundColor: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--muted)',
              fontSize: '0.7rem',
              flexShrink: 0
            }}
          >
            <User size={28} color="var(--gold-700)" />
            <span>No Photo</span>
          </div>
        )}

        <div style={{ flex: 1, minWidth: '220px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <h3 style={{ color: 'var(--ink)', fontSize: '1.25rem', margin: 0 }}>
              {formData.name || 'Unnamed Candidate'}
            </h3>
            <span
              style={{
                fontSize: '0.75rem',
                background: 'var(--maroon-900)',
                color: '#ffffff',
                padding: '0.15rem 0.55rem',
                borderRadius: 'var(--radius-pill)',
                fontWeight: 600
              }}
            >
              {formData.gender === 'Female' ? 'Bride' : 'Groom'}
            </span>
          </div>

          <div style={{ color: 'var(--maroon-800)', fontWeight: 600, fontSize: '0.9rem', marginTop: '0.2rem' }}>
            {formData.age ? `${formData.age} Years` : ''} • DOB: {formData.dateOfBirth || '—'} • {formData.maritalStatus || 'Unmarried'}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.4rem', fontSize: '0.85rem', color: 'var(--ink-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Phone size={13} color="var(--maroon-700)" /> {formData.phone}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <MapPin size={13} color="var(--maroon-700)" /> {formData.location || '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Profile Sections */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}
      >
        {/* Section 1: Family */}
        <div style={{ background: '#ffffff', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
          <h4 style={{ color: 'var(--maroon-900)', fontSize: '0.9rem', marginBottom: '0.65rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.3rem' }}>
            Family Details
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '0.35rem', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--muted)' }}>Father Name:</span>
            <strong>{formData.fatherName || '—'}</strong>
            <span style={{ color: 'var(--muted)' }}>Mother Name:</span>
            <strong>{formData.motherName || '—'}</strong>
            <span style={{ color: 'var(--muted)' }}>Family Type:</span>
            <span>{formData.familyType || '—'}</span>
            <span style={{ color: 'var(--muted)' }}>Siblings:</span>
            <span>{formData.siblings || 'None'}</span>
          </div>
        </div>

        {/* Section 2: Birth & Horoscope */}
        <div style={{ background: '#ffffff', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
          <h4 style={{ color: 'var(--maroon-900)', fontSize: '0.9rem', marginBottom: '0.65rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.3rem' }}>
            Horoscope & Astrology
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '0.35rem', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--muted)' }}>Birth Star:</span>
            <strong style={{ color: 'var(--maroon-900)' }}>{formData.birthStar || '—'}</strong>
            <span style={{ color: 'var(--muted)' }}>Zodiac Sign:</span>
            <strong>{formData.zodiacSign || '—'}</strong>
            <span style={{ color: 'var(--muted)' }}>Lagnam:</span>
            <span>{formData.lagnam || '—'}</span>
            <span style={{ color: 'var(--muted)' }}>Dosham:</span>
            <span>{formData.dosham || 'None'}</span>
          </div>
        </div>

        {/* Section 3: Career & Income */}
        <div style={{ background: '#ffffff', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
          <h4 style={{ color: 'var(--maroon-900)', fontSize: '0.9rem', marginBottom: '0.65rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.3rem' }}>
            Education & Career
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '0.35rem', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--muted)' }}>Height:</span>
            <span>{formData.height || '—'}</span>
            <span style={{ color: 'var(--muted)' }}>Education:</span>
            <strong>{formData.education || '—'}</strong>
            <span style={{ color: 'var(--muted)' }}>Occupation:</span>
            <strong>{formData.occupation || '—'}</strong>
            <span style={{ color: 'var(--muted)' }}>Income:</span>
            <span>{formData.income || '—'}</span>
          </div>
        </div>

        {/* Section 4: Social & Location */}
        <div style={{ background: '#ffffff', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
          <h4 style={{ color: 'var(--maroon-900)', fontSize: '0.9rem', marginBottom: '0.65rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.3rem' }}>
            Social & Location
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: '0.35rem', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--muted)' }}>Religion/Caste:</span>
            <strong>{formData.casteReligion || '—'}</strong>
            <span style={{ color: 'var(--muted)' }}>Native Place:</span>
            <span>{formData.nativePlace || '—'}</span>
            <span style={{ color: 'var(--muted)' }}>Location:</span>
            <span>{formData.location || '—'}</span>
            <span style={{ color: 'var(--muted)' }}>Email:</span>
            <span>{formData.email || '—'}</span>
          </div>
        </div>
      </div>

      {/* Expectations Box */}
      <div style={{ background: 'var(--gold-50)', padding: '1.15rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
        <h4 style={{ color: 'var(--maroon-900)', fontSize: '0.9rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <HeartHandshake size={16} />
          <span>Partner Expectations</span>
        </h4>
        <p style={{ color: 'var(--ink)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-line' }}>
          {formData.expectation || 'No specific expectations specified.'}
        </p>
      </div>

      {/* Consent Declaration Checkbox */}
      <div style={{ background: 'var(--surface-alt)', padding: '1.15rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--gold-500)', marginBottom: '1.25rem' }}>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={formData.consentAccepted}
            onChange={(e) => onConsentToggle(e.target.checked)}
            style={{ width: '18px', height: '18px', marginTop: '2px', accentColor: 'var(--maroon-900)', cursor: 'pointer' }}
          />
          <div style={{ fontSize: '0.875rem', color: 'var(--ink)', lineHeight: 1.5 }}>
            <strong style={{ display: 'block', color: 'var(--maroon-950)' }}>
              I confirm that all information provided is accurate and true.
            </strong>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)', display: 'block', marginTop: '0.15rem' }}>
              I authorize Rani Thirumana Sevai Maiyam to contact me and share profile details with prospective bride/groom families for matchmaking purposes.
            </span>
          </div>
        </label>
      </div>
    </div>
  );
}
