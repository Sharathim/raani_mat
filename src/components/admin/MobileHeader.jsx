import React from 'react';
import { Link } from 'react-router-dom';
import { LogoMark } from '../common/LogoMark';
import { BRAND } from '../../utils/constants';

export function MobileHeader() {
  return (
    <header className="admin-mobile-header" aria-label="Mobile Header">
      <div className="admin-mobile-header-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Left: ONLY Brand Logo links to /admin */}
          <Link to="/admin" className="admin-mobile-logo-link" title="Rani Matrimony Admin" style={{ display: 'flex', alignItems: 'center' }}>
            <LogoMark size={40} />
          </Link>
          {/* Website Name & Subtitle */}
          <div className="admin-mobile-brand-text" style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <span className="font-tamil-brand admin-mobile-brand-name" style={{ fontSize: 'clamp(0.78rem, 3.8vw, 1.025rem)', fontWeight: 700, color: 'var(--maroon-950)', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
              {BRAND.tamilName}
            </span>
            <span className="admin-mobile-brand-subtitle" style={{ fontSize: 'clamp(0.62rem, 2.6vw, 0.72rem)', color: 'var(--maroon-700)', fontWeight: 500, opacity: 0.85, marginTop: '1px', whiteSpace: 'nowrap' }}>
              Matrimonial Management Portal
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
