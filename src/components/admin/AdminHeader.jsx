import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoMark } from '../common/LogoMark';
import { BRAND } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';
import { LogOut, RefreshCw, Globe, Shield, User } from 'lucide-react';

export function AdminHeader({ onRefresh, isRefreshing = false }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <header
      className="admin-header"
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid var(--border)',
        padding: '0.75rem 1.25rem',
        boxShadow: 'var(--shadow-sm)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}
    >
      <div className="container admin-header-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        {/* Left: Brand Identity with Tamil Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <LogoMark size={38} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="font-tamil-brand" style={{ color: 'var(--maroon-900)', fontSize: '1.05rem', fontWeight: 800, lineHeight: 1.2 }}>
                  {BRAND.tamilName}
                </span>
                <span style={{ fontSize: '0.65rem', background: 'var(--maroon-900)', color: '#ffffff', padding: '0.1rem 0.45rem', borderRadius: 'var(--radius-pill)', fontWeight: 700, letterSpacing: '0.5px' }}>
                  ADMIN
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
                Matrimonial Management Portal
              </div>
            </div>
          </Link>
        </div>

        {/* Right: Modern SaaS Controls */}
        <div className="admin-header-actions" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link
            to="/"
            className="btn btn-secondary btn-sm"
            title="Open Public Website"
          >
            <Globe size={14} />
            <span>Public Site</span>
          </Link>

          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="btn btn-secondary btn-sm"
              title="Refresh Registrations"
            >
              <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} style={isRefreshing ? { animation: 'spin 1s linear infinite' } : {}} />
              <span>Refresh</span>
            </button>
          )}

          <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border)', margin: '0 0.25rem' }} />

          <button
            onClick={handleLogout}
            className="btn btn-danger btn-sm"
            title="Log out of admin"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
