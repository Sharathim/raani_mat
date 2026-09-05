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
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/#services' },
    { name: 'About Us', path: '/#about' },
    { name: 'Success Stories', path: '/#stories' },
    { name: 'Contact', path: '/#contact' }
  ];

  const isActive = (path) => {
    if (path.startsWith('/#')) return false;
    return location.pathname === path;
  };

  return (
    <header
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* Top Announcement Bar */}
      <div
        style={{
          background: 'linear-gradient(90deg, var(--maroon-950) 0%, var(--maroon-900) 50%, var(--maroon-950) 100%)',
          color: 'var(--gold-100)',
          padding: '0.35rem 1rem',
          fontSize: '0.775rem',
          borderBottom: '1px solid rgba(199, 150, 47, 0.3)'
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--gold-300)' }}>❖</span>
            <span style={{ fontWeight: 500 }}>
              {BRAND.tagline}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <a
              href={`tel:${BRAND.phones[0]}`}
              style={{ color: 'var(--gold-100)', display: 'flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}
            >
              <Phone size={12} color="var(--gold-300)" />
              <span>{BRAND.displayPhones}</span>
            </a>
            <Link
              to={isAuthenticated ? '/admin' : '/admin/login'}
              style={{
                color: 'var(--gold-300)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.75rem',
                opacity: 0.9
              }}
              title="Admin Portal"
            >
              <ShieldCheck size={12} />
              <span>{isAuthenticated ? 'Dashboard' : 'Admin Login'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container" style={{ padding: '0.65rem 1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand Logo & Tamil Title */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <LogoMark size={46} />
            <div>
              <div
                className="font-tamil-brand"
                style={{
                  color: 'var(--maroon-900)',
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                  fontWeight: 800,
                  lineHeight: 1.15
                }}
              >
                {BRAND.tamilName}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--gold-800)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.5px'
                }}
              >
                {BRAND.englishName}
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  color: isActive(link.path) ? 'var(--maroon-700)' : 'var(--ink)',
                  fontWeight: isActive(link.path) ? 700 : 500,
                  fontSize: '0.9rem',
                  transition: 'color var(--transition-fast)'
                }}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/register"
              className="btn btn-primary btn-sm"
              style={{ padding: '0.55rem 1.15rem' }}
            >
              <HeartHandshake size={16} />
              <span>Register Profile</span>
            </Link>
          </nav>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle-btn"
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.4rem',
              color: 'var(--maroon-900)',
              cursor: 'pointer',
              display: 'none'
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div
            style={{
              marginTop: '0.75rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: '0.4rem 0',
                  color: 'var(--ink)',
                  fontWeight: 600,
                  fontSize: '0.925rem'
                }}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.35rem' }}
            >
              <HeartHandshake size={16} />
              <span>Register Profile Online</span>
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
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
