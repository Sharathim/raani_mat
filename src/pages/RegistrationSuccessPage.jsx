import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { BrandHeader } from '../components/common/BrandHeader';
import { Footer } from '../components/common/Footer';
import { LogoMark } from '../components/common/LogoMark';
import { OrnateCorner, GoldDivider } from '../components/common/DecorativeElements';
import { BRAND } from '../utils/constants';
import {
  CheckCircle2,
  Copy,
  Check,
  Home,
  UserPlus,
  Phone,
  Sparkles,
  Heart
} from 'lucide-react';

export function RegistrationSuccessPage() {
  const { registrationId } = useParams();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c7962f', '#5a0715', '#e3bd63', '#a51d34']
      });
    } catch {
      // Ignore if confetti is blocked
    }
  }, []);

  const handleCopy = () => {
    if (registrationId) {
      navigator.clipboard.writeText(registrationId);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--ivory)' }}>
      <BrandHeader />

      <main style={{ flex: 1, padding: '3.5rem 1.25rem 5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container-narrow">
          <div
            className="card-clean"
            style={{
              padding: '3rem 2rem',
              backgroundColor: '#ffffff',
              textAlign: 'center',
              border: '1.5px solid var(--gold-500)',
              boxShadow: 'var(--shadow-hover)',
              position: 'relative',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <OrnateCorner position="top-left" />
            <OrnateCorner position="top-right" />
            <OrnateCorner position="bottom-left" />
            <OrnateCorner position="bottom-right" />

            {/* Success Icon Badge */}
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'var(--success-bg)',
                border: '2px solid var(--success-border)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem'
              }}
            >
              <CheckCircle2 size={40} />
            </div>

            <span
              style={{
                display: 'inline-block',
                background: 'var(--maroon-50)',
                color: 'var(--maroon-900)',
                padding: '0.2rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '0.75rem'
              }}
            >
              Registration Completed
            </span>

            <h1 style={{ color: 'var(--maroon-950)', fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', margin: '0 0 0.4rem' }}>
              Profile Submitted Successfully!
            </h1>

            <p style={{ color: 'var(--ink-secondary)', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
              Your matrimonial details have been securely received. Our matchmaking team will review your profile and contact you shortly with compatible matches.
            </p>

            {/* Reference ID Card */}
            <div
              style={{
                background: 'var(--surface-alt)',
                border: '1.5px dashed var(--gold-500)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                maxWidth: '460px',
                margin: '0 auto 1.75rem'
              }}
            >
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>
                Your Registration Reference ID
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  color: 'var(--maroon-950)',
                  letterSpacing: '1px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.65rem',
                  marginTop: '0.25rem'
                }}
              >
                <span>{registrationId || 'RANI-8F3K2A1C'}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                  title="Copy Registration ID"
                >
                  {copied ? <Check size={13} color="var(--success)" /> : <Copy size={13} />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.4rem' }}>
                Please quote this Reference ID for any future inquiries.
              </div>
            </div>

            {/* Helpline Notice */}
            <div
              style={{
                background: '#ffffff',
                padding: '0.9rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                maxWidth: '480px',
                margin: '0 auto 1.75rem',
                fontSize: '0.85rem',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--maroon-900)', fontWeight: 700, marginBottom: '0.25rem' }}>
                <Phone size={14} />
                <span>Service Center Assistance:</span>
              </div>
              <div style={{ color: 'var(--ink)' }}>
                Helpline: <strong>{BRAND.displayPhones}</strong>
                <br />
                Office Address: {BRAND.address}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.85rem' }}>
              <Link to="/" className="btn btn-secondary btn-lg">
                <Home size={16} />
                <span>Return to Home</span>
              </Link>
              <Link to="/register" className="btn btn-primary btn-lg">
                <UserPlus size={16} />
                <span>Register Another Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
