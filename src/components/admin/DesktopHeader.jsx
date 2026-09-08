import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoMark } from '../common/LogoMark';
import { BRAND } from '../../utils/constants';
import { LayoutDashboard, Clock, Users, CheckCircle2, LogOut, Globe } from 'lucide-react';

export function DesktopHeader({ onRequestLogout }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const isDashboardActive = currentPath === '/admin';
  const isNewActive = currentPath.startsWith('/admin/new');
  const isProfilesActive = currentPath.startsWith('/admin/profiles') || currentPath.startsWith('/admin/candidates');
  const isCompletedActive = currentPath.startsWith('/admin/completed');

  return (
    <header className="admin-desktop-header" aria-label="Desktop Header Navigation">
      <div className="container admin-header-inner">
        {/* Left: Brand Logo & Website Title */}
        <div className="admin-header-brand-wrap">
          <Link to="/admin" className="admin-header-brand-link" title="Rani Matrimony Admin">
            <LogoMark size={38} />
            <div className="admin-header-brand-text">
              <div className="admin-header-title-row">
                <span className="font-tamil-brand admin-header-brand-name">
                  {BRAND.tamilName}
                </span>
                <span className="admin-badge-desktop">
                  ADMIN
                </span>
              </div>
              <div className="admin-subtitle-desktop">
                Matrimonial Management Portal
              </div>
            </div>
          </Link>
        </div>

        {/* Center/Right: Desktop Primary Navigation Tabs & Utilities */}
        <nav className="admin-desktop-nav" aria-label="Desktop Admin Navigation">
          <Link
            to="/admin"
            className={`admin-desktop-nav-link ${isDashboardActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={17} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/admin/new"
            className={`admin-desktop-nav-link ${isNewActive ? 'active' : ''}`}
          >
            <Clock size={17} />
            <span>New</span>
          </Link>

          <Link
            to="/admin/profiles"
            className={`admin-desktop-nav-link ${isProfilesActive ? 'active' : ''}`}
          >
            <Users size={17} />
            <span>Profiles</span>
          </Link>

          <Link
            to="/admin/completed"
            className={`admin-desktop-nav-link ${isCompletedActive ? 'active' : ''}`}
          >
            <CheckCircle2 size={17} />
            <span>Completed</span>
          </Link>

          <div className="admin-desktop-nav-divider" />

          <Link
            to="/"
            className="admin-desktop-utility-btn"
            title="Open Public Website"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Globe size={15} />
            <span>Public Site</span>
          </Link>

          <button
            type="button"
            onClick={onRequestLogout}
            className="admin-desktop-logout-btn"
            title="Logout from Admin"
            aria-label="Logout"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
