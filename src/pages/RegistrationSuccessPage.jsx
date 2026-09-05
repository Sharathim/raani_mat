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
    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c7962f', '#5a0715', '#e3bd63', '#a51d34']
      });
    } catch {
      // Ignore if confetti fails
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
            className="card-ornate"
            style={{
              padding: '3rem 2rem',
              backgroundColor: 'var(--paper)',
              textAlign: 'center',
              border: '2px solid var(--gold-500)',
              boxShadow: 'var(--shadow-hover)',
              position: 'relative'
            }}
          >
            <OrnateCorner position="top-left" />
            <OrnateCorner position="top-right" />
            <OrnateCorner position="bottom-left" />
            <OrnateCorner position="bottom-right" />

            {/* Success Icon Badge */}
            <div
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                backgroundColor: 'var(--success-bg)',
                border: '2px solid var(--success-border)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                boxShadow: '0 4px 15px rgba(40, 122, 69, 0.2)'
              }}
            >
              <CheckCircle2 size={44} />
            </div>

            <span className="pill-title-gold" style={{ marginBottom: '1rem', display: 'inline-block' }}>
              <span>❖</span> பதிவு நிறைவடைந்தது (Success) <span>❖</span>
            </span>

            <h1 className="font-tamil-serif" style={{ color: 'var(--maroon-950)', fontSize: 'clamp(1.75rem, 3.5vw, 2.35rem)', marginTop: '0.5rem', marginBottom: '0.25rem' }}>
              பதிவு வெற்றிகரமாக நிறைவடைந்தது!
            </h1>

            <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--gold-800)', fontSize: '1.15rem', fontWeight: 600, marginBottom: '1rem' }}>
              Registration Completed Successfully
            </div>

            <p style={{ color: 'var(--ink)', fontSize: '1rem', maxWidth: '580px', margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
              உங்கள் மணமக்கள் விவரங்கள் எங்கள் அமைப்பில் பாதுகாப்பாக பெறப்பட்டுள்ளன. எங்கள் திருமண சேவை மைய நிர்வாகிகள் உங்கள் விவரங்களை சரிபார்த்து விரைவில் தொடர்பு கொள்வர்.
            </p>

            {/* Registration Reference ID Box */}
            <div
              style={{
                background: 'linear-gradient(135deg, #fffcf5 0%, #fdf5e6 100%)',
                border: '2px dashed var(--gold-500)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                maxWidth: '480px',
                margin: '0 auto 2rem'
              }}
            >
              <div style={{ fontSize: '0.85rem', color: 'var(--maroon-800)', fontWeight: 600, marginBottom: '0.35rem' }}>
                உங்கள் பதிவு எண் (Your Registration Reference ID):
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.75rem',
                  fontWeight: 800,
                  color: 'var(--maroon-950)',
                  letterSpacing: '1.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  marginTop: '0.25rem'
                }}
              >
                <span>{registrationId || 'RANI-8F3K2A1C'}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="btn btn-secondary btn-sm"
                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                  title="Copy Registration ID"
                >
                  {copied ? <Check size={14} color="var(--success)" /> : <Copy size={14} />}
                  <span>{copied ? 'நகலெடுக்கப்பட்டது!' : 'நகல் (Copy)'}</span>
                </button>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
                எங்களை தொடர்பு கொள்ளும்போது இந்த பதிவு எண்ணை குறிப்பிடவும் (Quote this ID for future inquiries).
              </div>
            </div>

            <GoldDivider />

            {/* Help & Contact Notice */}
            <div style={{ background: 'var(--cream)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', maxWidth: '520px', margin: '0 auto 2rem', fontSize: '0.9rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--maroon-900)', fontWeight: 700, marginBottom: '0.3rem' }}>
                <Phone size={16} />
                <span>உடனடி உதவிக்கு:</span>
              </div>
              <div style={{ color: 'var(--ink)' }}>
                தொலைபேசி: <strong>+91 {BRAND.phones[0]}</strong> / <strong>+91 {BRAND.phones[1]}</strong>
                <br />
                முகவரி: {BRAND.address}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
              <Link to="/" className="btn btn-secondary btn-lg">
                <Home size={18} />
                <span>முகப்பு (Back Home)</span>
              </Link>
              <Link to="/register" className="btn btn-primary btn-lg">
                <UserPlus size={18} />
                <span>புதிய பதிவு (New Registration)</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
