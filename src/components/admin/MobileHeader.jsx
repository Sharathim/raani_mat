import React from 'react';
import { Link } from 'react-router-dom';
import { LogoMark } from '../common/LogoMark';
import { BRAND } from '../../utils/constants';

export function MobileHeader() {
  return (
    <header className="admin-mobile-header" aria-label="Mobile Header">
      <div className="admin-mobile-header-inner">
        {/* Left: Brand Logo + COMPLETE Tamil Website Name */}
        <Link to="/admin" className="admin-mobile-brand-link" title="Rani Matrimony">
          <LogoMark size={32} />
          <span className="font-tamil-brand admin-mobile-brand-name">
            {BRAND.tamilName}
          </span>
        </Link>
      </div>
    </header>
  );
}
