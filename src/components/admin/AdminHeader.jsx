import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogoMark } from '../common/LogoMark';
import { BRAND } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';
import { LogOut, RefreshCw, Home, Shield } from 'lucide-react';

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
      style={{
        backgroundColor: 'var(--maroon-950)',
        color: 'var(--gold-100)',
        borderBottom: '2.5px solid var(--gold-500)',
        padding: '0.85rem 1.25rem',
        boxShadow: 'var(--shadow-card)'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        {/* Left: Brand Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <LogoMark size={44} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 className="font-tamil-serif" style={{ color: 'var(--gold-100)', fontSize: '1.25rem', margin: 0, lineHeight: 1.2 }}>
                {BRAND.tamilName}
              </h1>
              <span style={{ fontSize: '0.75rem', background: 'var(--gold-700)', color: 'var(--paper)', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-pill)', fontWeight: 700 }}>
                ADMIN
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--gold-300)' }}>
              நிர்வாக கட்டுப்பாட்டு மையம் (Administrative Portal)
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link
            to="/"
            className="btn btn-secondary btn-sm"
            style={{
              background: 'rgba(255, 250, 240, 0.1)',
              color: 'var(--gold-100)',
              border: '1px solid var(--gold-700)'
            }}
          >
            <Home size={15} />
            <span>முகப்பு (Public Site)</span>
          </Link>

          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="btn btn-secondary btn-sm"
              style={{
                background: 'rgba(255, 250, 240, 0.1)',
                color: 'var(--gold-100)',
                border: '1px solid var(--gold-700)'
              }}
              title="Refresh Registrations"
            >
              <RefreshCw size={15} className={isRefreshing ? 'animate-spin' : ''} style={isRefreshing ? { animation: 'spin 1s linear infinite' } : {}} />
              <span>புதுப்பி (Refresh)</span>
            </button>
          )}

          <button
            onClick={handleLogout}
            className="btn btn-danger btn-sm"
            title="Log out from admin"
          >
            <LogOut size={15} />
            <span>வெளியேறு (Logout)</span>
          </button>
        </div>
      </div>
    </header>
  );
}
