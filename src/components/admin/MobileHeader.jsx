import React from 'react';
import { Link } from 'react-router-dom';
import { LogoMark } from '../common/LogoMark';
import { BRAND } from '../../utils/constants';
import { RefreshCw } from 'lucide-react';

export function MobileHeader({
  onRefresh,
  isRefreshing = false
}) {
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

        {/* Right: Optional Refresh Action */}
        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            className="admin-mobile-refresh-icon-btn"
            title="Refresh Data"
            aria-label="Refresh data"
          >
            <RefreshCw
              size={18}
              style={isRefreshing ? { animation: 'spin 1s linear infinite' } : {}}
            />
          </button>
        )}
      </div>
    </header>
  );
}
