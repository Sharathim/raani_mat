import React from 'react';
import { Sparkles, CheckCircle2, User, Phone, MapPin, Briefcase, HeartHandshake } from 'lucide-react';
import { OrnateCorner } from '../common/DecorativeElements';

export function ReviewCard({ formData, onConsentToggle, isSubmitting }) {
  return (
    <div
      className="card-ornate"
      style={{
        padding: '2rem 1.5rem',
        marginBottom: '2rem',
        backgroundColor: 'var(--paper)'
      }}
    >
      <OrnateCorner position="top-left" />
      <OrnateCorner position="top-right" />

      <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <span className="pill-title">
          <span>❖</span>
          <span>பதிவு விவரங்கள் சரிபார்ப்பு (Profile Review)</span>
          <span>❖</span>
        </span>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
          கீழ்க்கண்ட விவரங்களை சரிபார்த்து உறுதி செய்யவும் (Please review all information before submitting).
        </p>
      </div>

      {/* Profile Header Block */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #fffcf5 0%, #fdf5e6 100%)',
          border: '1.5px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          marginBottom: '1.75rem'
        }}
      >
        {formData.photoUrl ? (
          <div
            style={{
              width: '100px',
              height: '125px',
              borderRadius: 'var(--radius-sm)',
              border: '2px solid var(--gold-500)',
              overflow: 'hidden',
              flexShrink: 0,
              boxShadow: 'var(--shadow-sm)'
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
              width: '100px',
              height: '125px',
              borderRadius: 'var(--radius-sm)',
              border: '2px dashed var(--border)',
              backgroundColor: 'var(--cream)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--muted)',
              fontSize: '0.75rem',
              flexShrink: 0
            }}
          >
            <User size={32} color="var(--gold-700)" />
            <span>புகைப்படம் இல்லை</span>
          </div>
        )}

        <div style={{ flex: 1, minWidth: '220px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <h3 className="font-tamil-serif" style={{ color: 'var(--maroon-950)', fontSize: '1.4rem', margin: 0 }}>
              {formData.name || '—'}
            </h3>
            <span style={{ fontSize: '0.8rem', background: 'var(--maroon-900)', color: 'var(--gold-100)', padding: '0.15rem 0.6rem', borderRadius: 'var(--radius-pill)', fontWeight: 600 }}>
              {formData.gender === 'Female' ? 'பெண் வரன் (Bride)' : 'ஆண் வரன் (Groom)'}
            </span>
          </div>
          <div style={{ color: 'var(--maroon-800)', fontWeight: 600, fontSize: '0.95rem', marginTop: '0.2rem' }}>
            {formData.age} வயது • {formData.dateOfBirth} • {formData.maritalStatus}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--ink)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Phone size={14} color="var(--maroon-700)" /> {formData.phone}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <MapPin size={14} color="var(--maroon-700)" /> {formData.location || '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Detailed Tables / Key-Value Grids */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          marginBottom: '1.75rem'
        }}
      >
        {/* Section 1: Family */}
        <div style={{ background: 'var(--cream)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
          <h4 className="font-tamil-serif" style={{ color: 'var(--maroon-900)', fontSize: '1rem', marginBottom: '0.65rem', borderBottom: '1px solid var(--line)', paddingBottom: '0.35rem' }}>
            குடும்ப விவரம் (Family Details)
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.4rem', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--muted)', fontWeight: 500 }}>அப்பா பெயர்:</span>
            <span style={{ fontWeight: 600 }}>{formData.fatherName || '—'}</span>
            <span style={{ color: 'var(--muted)', fontWeight: 500 }}>அம்மா பெயர்:</span>
            <span style={{ fontWeight: 600 }}>{formData.motherName || '—'}</span>
            <span style={{ color: 'var(--muted)', fontWeight: 500 }}>உடன் பிறந்தவர்:</span>
            <span>{formData.siblings || '—'}</span>
          </div>
        </div>

        {/* Section 2: Birth & Horoscope */}
        <div style={{ background: 'var(--cream)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
          <h4 className="font-tamil-serif" style={{ color: 'var(--maroon-900)', fontSize: '1rem', marginBottom: '0.65rem', borderBottom: '1px solid var(--line)', paddingBottom: '0.35rem' }}>
            பிறப்பு & ஜாதகம் (Horoscope)
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.4rem', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--muted)', fontWeight: 500 }}>நட்சத்திரம்:</span>
            <span style={{ fontWeight: 600, color: 'var(--maroon-900)' }}>{formData.birthStar || '—'}</span>
            <span style={{ color: 'var(--muted)', fontWeight: 500 }}>ராசி:</span>
            <span style={{ fontWeight: 600 }}>{formData.zodiacSign || '—'}</span>
            <span style={{ color: 'var(--muted)', fontWeight: 500 }}>லக்கினம்:</span>
            <span>{formData.lagnam || '—'}</span>
            <span style={{ color: 'var(--muted)', fontWeight: 500 }}>தோஷம்:</span>
            <span>{formData.dosham || 'None'}</span>
          </div>
        </div>

        {/* Section 3: Education & Career */}
        <div style={{ background: 'var(--cream)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
          <h4 className="font-tamil-serif" style={{ color: 'var(--maroon-900)', fontSize: '1rem', marginBottom: '0.65rem', borderBottom: '1px solid var(--line)', paddingBottom: '0.35rem' }}>
            கல்வி & தொழில் (Career)
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.4rem', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--muted)', fontWeight: 500 }}>உயரம்:</span>
            <span>{formData.height || '—'}</span>
            <span style={{ color: 'var(--muted)', fontWeight: 500 }}>கல்வி:</span>
            <span style={{ fontWeight: 600 }}>{formData.education || '—'}</span>
            <span style={{ color: 'var(--muted)', fontWeight: 500 }}>தொழில்:</span>
            <span style={{ fontWeight: 600 }}>{formData.occupation || '—'}</span>
            <span style={{ color: 'var(--muted)', fontWeight: 500 }}>வருமானம்:</span>
            <span>{formData.income || '—'}</span>
          </div>
        </div>

        {/* Section 4: Social & Location */}
        <div style={{ background: 'var(--cream)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
          <h4 className="font-tamil-serif" style={{ color: 'var(--maroon-900)', fontSize: '1rem', marginBottom: '0.65rem', borderBottom: '1px solid var(--line)', paddingBottom: '0.35rem' }}>
            சமூகம் & இருப்பிடம்
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '0.4rem', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--muted)', fontWeight: 500 }}>மதம் / சாதி:</span>
            <span style={{ fontWeight: 600 }}>{formData.casteReligion || '—'}</span>
            <span style={{ color: 'var(--muted)', fontWeight: 500 }}>சொந்த ஊர்:</span>
            <span>{formData.nativePlace || '—'}</span>
            <span style={{ color: 'var(--muted)', fontWeight: 500 }}>தற்போதைய இடம்:</span>
            <span>{formData.location || '—'}</span>
            <span style={{ color: 'var(--muted)', fontWeight: 500 }}>மின்னஞ்சல்:</span>
            <span>{formData.email || '—'}</span>
          </div>
        </div>
      </div>

      {/* Expectations Box */}
      <div style={{ background: '#fffcf7', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border)', marginBottom: '1.75rem' }}>
        <h4 className="font-tamil-serif" style={{ color: 'var(--maroon-900)', fontSize: '1rem', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <HeartHandshake size={18} color="var(--gold-700)" />
          <span>எதிர்பார்ப்புகள் (Partner Expectations)</span>
        </h4>
        <p style={{ color: 'var(--ink)', fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
          {formData.expectation || 'குறிப்பிட்ட எதிர்பார்ப்புகள் இல்லை (No specific expectations provided).'}
        </p>
      </div>

      {/* Declarations & Consent */}
      <div style={{ background: 'var(--cream)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--gold-500)', marginBottom: '1.5rem' }}>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={formData.consentAccepted}
            onChange={(e) => onConsentToggle(e.target.checked)}
            style={{ width: '20px', height: '20px', marginTop: '2px', accentColor: 'var(--maroon-900)', cursor: 'pointer' }}
          />
          <div style={{ fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.5 }}>
            <div className="font-tamil-sans" style={{ fontWeight: 700, color: 'var(--maroon-950)' }}>
              நான் அளித்த தகவல்கள் சரியானவை என்பதை உறுதிப்படுத்துகிறேன்.
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
              I confirm that all the details provided above are true and accurate to the best of my knowledge. Rani Thirumana Sevai Maiyam may contact me and share profile data with prospective matches.
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
