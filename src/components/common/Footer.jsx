import React from 'react';
import { Link } from 'react-router-dom';
import { LogoMark } from './LogoMark';
import { BRAND } from '../../utils/constants';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--maroon-950)',
        color: 'var(--gold-100)',
        borderTop: '3px solid var(--gold-500)',
        position: 'relative',
        marginTop: '4rem'
      }}
    >
      {/* Decorative Gold Border Wave */}
      <div
        style={{
          height: '4px',
          background: 'linear-gradient(90deg, var(--gold-800) 0%, var(--gold-300) 50%, var(--gold-800) 100%)'
        }}
      />

      <div className="container" style={{ padding: '3.5rem 1.25rem 2rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2.5rem',
            marginBottom: '2.5rem'
          }}
        >
          {/* Column 1: Brand & Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
              <LogoMark size={48} />
              <div>
                <h3 className="font-tamil-serif" style={{ color: 'var(--gold-300)', fontSize: '1.2rem', margin: 0 }}>
                  {BRAND.tamilName}
                </h3>
                <div style={{ color: 'var(--gold-100)', fontSize: '0.8rem', opacity: 0.85 }}>
                  {BRAND.englishName}
                </div>
              </div>
            </div>
            <p style={{ color: 'rgba(255, 250, 240, 0.8)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              {BRAND.tagline} {BRAND.subTagline} உங்கள் குடும்பத்தின் நம்பிக்கைக்குரிய திருமண தகவல் சேவை மையம்.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(199, 150, 47, 0.15)', border: '1px solid var(--gold-700)', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--gold-300)' }}>
              <span>✦</span>
              <span>அனைத்து சமூகத்தினருக்கும் நல்வரன் தேட சிறந்த இடம்</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-tamil-serif" style={{ color: 'var(--gold-300)', fontSize: '1.1rem', marginBottom: '1.2rem', borderBottom: '1px solid var(--gold-800)', paddingBottom: '0.5rem' }}>
              முக்கிய இணைப்புகள் (Quick Links)
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <li>
                <Link to="/" style={{ color: 'var(--gold-100)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--gold-500)' }}>›</span> முகப்பு (Home)
                </Link>
              </li>
              <li>
                <Link to="/register" style={{ color: 'var(--gold-100)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--gold-500)' }}>›</span> மணமக்கள் பதிவு (Register Profile)
                </Link>
              </li>
              <li>
                <Link to="/#services" style={{ color: 'var(--gold-100)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--gold-500)' }}>›</span> எங்களின் சேவைகள் (Our Services)
                </Link>
              </li>
              <li>
                <Link to="/#about" style={{ color: 'var(--gold-100)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--gold-500)' }}>›</span> எங்களை பற்றி (About Us)
                </Link>
              </li>
              <li>
                <Link to="/admin/login" style={{ color: 'var(--gold-300)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.8 }}>
                  <ShieldCheck size={14} /> நிர்வாக உள்நுழைவு (Admin Login)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Address */}
          <div>
            <h4 className="font-tamil-serif" style={{ color: 'var(--gold-300)', fontSize: '1.1rem', marginBottom: '1.2rem', borderBottom: '1px solid var(--gold-800)', paddingBottom: '0.5rem' }}>
              தொடர்பு முகவரி (Contact Us)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <MapPin size={18} color="var(--gold-300)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'rgba(255, 250, 240, 0.85)' }}>{BRAND.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Phone size={18} color="var(--gold-300)" style={{ flexShrink: 0 }} />
                <a href={`tel:${BRAND.phones[0]}`} style={{ color: 'var(--gold-100)', textDecoration: 'none' }}>
                  {BRAND.displayPhones} / {BRAND.landline}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Mail size={18} color="var(--gold-300)" style={{ flexShrink: 0 }} />
                <a href={`mailto:${BRAND.email}`} style={{ color: 'var(--gold-100)', textDecoration: 'none' }}>
                  {BRAND.email}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Clock size={18} color="var(--gold-300)" style={{ flexShrink: 0 }} />
                <span style={{ color: 'rgba(255, 250, 240, 0.85)', fontSize: '0.85rem' }}>
                  {BRAND.hours}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Privacy & Copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(229, 201, 135, 0.2)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'rgba(255, 250, 240, 0.7)'
          }}
        >
          <div>
            © {BRAND.copyrightYear} {BRAND.tamilName} ({BRAND.englishName}). அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--gold-300)' }}>
            <span>Dedicated with</span>
            <Heart size={14} fill="var(--maroon-500)" color="var(--maroon-500)" />
            <span>for Happy Marriages</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
