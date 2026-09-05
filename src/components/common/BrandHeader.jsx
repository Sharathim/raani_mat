import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoMark } from './LogoMark';
import { BRAND } from '../../utils/constants';
import { Menu, X, ShieldCheck, Phone, HeartHandshake } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function BrandHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { nameTa: 'முகப்பு', nameEn: 'Home', path: '/' },
    { nameTa: 'சேவைகள்', nameEn: 'Services', path: '/#services' },
    { nameTa: 'எங்களை பற்றி', nameEn: 'About Us', path: '/#about' },
    { nameTa: 'தொடர்புக்கு', nameEn: 'Contact', path: '/#contact' }
  ];

  const isActive = (path) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  return (
    <header
      style={{
        backgroundColor: 'var(--paper)',
        borderBottom: '2px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* Top Auspicious Announcement Bar */}
      <div
        style={{
          background: 'linear-gradient(90deg, var(--maroon-950) 0%, var(--maroon-800) 50%, var(--maroon-950) 100%)',
          color: 'var(--gold-100)',
          padding: '0.35rem 1rem',
          fontSize: '0.8rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--gold-700)'
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--gold-300)' }}>❖</span>
            <span className="font-tamil-sans" style={{ fontWeight: 500 }}>
              {BRAND.tagline} {BRAND.subTagline}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <a
              href={`tel:${BRAND.phones[0]}`}
              style={{ color: 'var(--gold-100)', display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}
            >
              <Phone size={13} color="var(--gold-300)" />
              <span>{BRAND.displayPhones}</span>
            </a>
            <Link
              to={isAuthenticated ? "/admin" : "/admin/login"}
              style={{
                color: 'var(--gold-300)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.75rem',
                opacity: 0.85
              }}
              title="Admin Portal"
            >
              <ShieldCheck size={13} />
              <span>{isAuthenticated ? 'Dashboard' : 'நிர்வாகம் (Admin)'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container" style={{ padding: '0.65rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand Logo & Titles */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', textDecoration: 'none' }}>
            <LogoMark size={50} />
            <div>
              <div
                className="font-tamil-serif"
                style={{
                  color: 'var(--maroon-900)',
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                  fontWeight: 800,
                  letterSpacing: '0.2px',
                  lineHeight: 1.2
                }}
              >
                {BRAND.tamilName}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--gold-800)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}
              >
                {BRAND.englishName}
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  color: isActive(link.path) ? 'var(--maroon-700)' : 'var(--ink)',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  transition: 'color var(--transition-fast)'
                }}
              >
                <span className="font-tamil-sans">{link.nameTa}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 400 }}>{link.nameEn}</span>
              </Link>
            ))}

            <Link
              to="/register"
              className="btn btn-primary"
              style={{
                padding: '0.6rem 1.35rem',
                fontSize: '0.95rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <HeartHandshake size={18} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
                <span>மணமக்கள் பதிவு</span>
                <span style={{ fontSize: '0.7rem', opacity: 0.9, fontWeight: 400 }}>Register Now</span>
              </div>
            </Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle-btn"
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.45rem',
              color: 'var(--maroon-900)',
              cursor: 'pointer',
              display: 'none'
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              marginTop: '0.75rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--line)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem'
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.5rem 0',
                  color: 'var(--maroon-900)',
                  fontWeight: 600
                }}
              >
                <span className="font-tamil-sans">{link.nameTa}</span>
                <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{link.nameEn}</span>
              </Link>
            ))}

            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              <HeartHandshake size={18} />
              <span>மணமக்கள் பதிவு (Register Now)</span>
            </Link>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
