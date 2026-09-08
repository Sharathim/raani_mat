import React from 'react';
import { LayoutDashboard, Users, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function AdminBottomNav({ onRequestLogout }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const isDashboard = currentPath === '/admin';
  const isCandidates = currentPath.startsWith('/admin/candidates');

  return (
    <nav className="admin-bottom-nav" aria-label="Mobile Navigation">
      <Link
        to="/admin"
        className={`admin-bottom-nav-item ${isDashboard ? 'active' : ''}`}
        aria-label="Dashboard"
      >
        <LayoutDashboard size={20} />
        <span>Dashboard</span>
      </Link>

      <Link
        to="/admin/candidates"
        className={`admin-bottom-nav-item ${isCandidates ? 'active' : ''}`}
        aria-label="Candidates"
      >
        <Users size={20} />
        <span>Candidates</span>
      </Link>

      <button
        type="button"
        className="admin-bottom-nav-item admin-bottom-nav-logout"
        onClick={onRequestLogout}
        aria-label="Logout"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </nav>
  );
}
