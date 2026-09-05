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
        borderTop: '2px solid var(--gold-500)',
        position: 'relative',
        marginTop: '3.5rem'
      }}
    >
      <div className="container" style={{ padding: '3rem 1.25rem 1.75rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2.5rem',
            marginBottom: '2rem'
          }}
        >
          {/* Column 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
              <LogoMark size={44} />
              <div>
                <h3 className="font-tamil-brand" style={{ color: 'var(--gold-300)', fontSize: '1.15rem', margin: 0 }}>
                  {BRAND.tamilName}
                </h3>
                <div style={{ color: 'var(--gold-100)', fontSize: '0.75rem', opacity: 0.9 }}>
                  {BRAND.englishName}
                </div>
              </div>
            </div>
            <p style={{ color: 'rgba(255, 250, 240, 0.8)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '0.85rem' }}>
              {BRAND.tagline}. Dedicated to helping families discover compatible life partners with integrity and tradition.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(199, 150, 47, 0.15)', border: '1px solid var(--gold-700)', padding: '0.35rem 0.75rem', borderRadius: 'var(--radius-xs)', fontSize: '0.75rem', color: 'var(--gold-300)' }}>
              <span>✦</span>
              <span>Personalized Matchmaking Services</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ color: 'var(--gold-300)', fontSize: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--gold-800)', paddingBottom: '0.4rem' }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>
                <Link to="/" style={{ color: 'var(--gold-100)', fontSize: '0.875rem' }}>
                  › Home Page
                </Link>
              </li>
              <li>
                <Link to="/register" style={{ color: 'var(--gold-100)', fontSize: '0.875rem' }}>
                  › Register Matrimonial Profile
                </Link>
              </li>
              <li>
                <Link to="/#services" style={{ color: 'var(--gold-100)', fontSize: '0.875rem' }}>
                  › Matrimonial Services
                </Link>
              </li>
              <li>
                <Link to="/#about" style={{ color: 'var(--gold-100)', fontSize: '0.875rem' }}>
                  › About Our Service Center
                </Link>
              </li>
              <li>
                <Link to="/admin/login" style={{ color: 'var(--gold-300)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem', opacity: 0.85 }}>
                  <ShieldCheck size={13} /> Admin Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Address */}
          <div>
            <h4 style={{ color: 'var(--gold-300)', fontSize: '1rem', marginBottom: '1rem', borderBottom: '1px solid var(--gold-800)', paddingBottom: '0.4rem' }}>
              Service Center Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <MapPin size={16} color="var(--gold-300)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'rgba(255, 250, 240, 0.85)' }}>{BRAND.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={16} color="var(--gold-300)" style={{ flexShrink: 0 }} />
                <a href={`tel:${BRAND.phones[0]}`} style={{ color: 'var(--gold-100)', textDecoration: 'none' }}>
                  {BRAND.displayPhones} / {BRAND.landline}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={16} color="var(--gold-300)" style={{ flexShrink: 0 }} />
                <a href={`mailto:${BRAND.email}`} style={{ color: 'var(--gold-100)', textDecoration: 'none' }}>
                  {BRAND.email}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} color="var(--gold-300)" style={{ flexShrink: 0 }} />
                <span style={{ color: 'rgba(255, 250, 240, 0.85)', fontSize: '0.8rem' }}>
                  {BRAND.hours}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div
          style={{
            borderTop: '1px solid rgba(229, 201, 135, 0.15)',
            paddingTop: '1.25rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.8rem',
            color: 'rgba(255, 250, 240, 0.65)'
          }}
        >
          <div>
            © {BRAND.copyrightYear} {BRAND.tamilName} ({BRAND.englishName}). All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--gold-300)' }}>
            <span>Connecting Hearts & Families</span>
            <Heart size={13} fill="var(--maroon-500)" color="var(--maroon-500)" />
          </div>
        </div>
      </div>
    </footer>
  );
}
