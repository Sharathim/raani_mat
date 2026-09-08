import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogoMark } from '../common/LogoMark';
import { BRAND } from '../../utils/constants';
import { LayoutDashboard, Users, Clock, CheckCircle2, LogOut, Globe } from 'lucide-react';

export function AdminHeader({
  onRefresh,
  isRefreshing = false,
  onRequestLogout
}) {
  const location = useLocation();
  const currentPath = location.pathname;

  const isDashboardActive = currentPath === '/admin';
  const isCandidatesActive = currentPath.startsWith('/admin/candidates');

  return (
    <header className="admin-header">
      <div className="container admin-header-inner">
        {/* Left: Brand Logo & COMPLETE Tamil Website Name */}
        <div className="admin-header-brand-wrap">
          <Link to="/admin" className="admin-header-brand-link" title="Rani Matrimony Admin">
            <LogoMark size={36} />
            <div className="admin-header-brand-text">
              <div className="admin-header-title-row">
                <span className="font-tamil-brand admin-header-brand-name">
                  {BRAND.tamilName}
                </span>
                {/* Desktop-only ADMIN badge */}
                <span className="admin-badge-desktop">
                  ADMIN
                </span>
              </div>
              {/* Desktop-only subtitle */}
              <div className="admin-subtitle-desktop">
                Matrimonial Management Portal
              </div>
            </div>
          </Link>
        </div>

        {/* Center/Right: Desktop Primary Navigation Tabs */}
        <nav className="admin-desktop-nav" aria-label="Desktop Admin Navigation">
          <Link
            to="/admin"
            className={`admin-desktop-nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
          >
            <LayoutDashboard size={17} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/admin/new"
            className={`admin-desktop-nav-link ${location.pathname.startsWith('/admin/new') ? 'active' : ''}`}
          >
            <Clock size={17} />
            <span>New</span>
          </Link>

          <Link
            to="/admin/profiles"
            className={`admin-desktop-nav-link ${location.pathname.startsWith('/admin/profiles') || location.pathname.startsWith('/admin/candidates') ? 'active' : ''}`}
          >
            <Users size={17} />
            <span>Profiles</span>
          </Link>

          <Link
            to="/admin/completed"
            className={`admin-desktop-nav-link ${location.pathname.startsWith('/admin/completed') ? 'active' : ''}`}
          >
            <CheckCircle2 size={17} />
            <span>Completed</span>
          </Link>

          {/* Secondary Actions on Desktop */}
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
