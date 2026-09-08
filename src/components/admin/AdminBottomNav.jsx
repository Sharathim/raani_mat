import React from 'react';
import { LayoutDashboard, Clock, Users, CheckCircle2, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function AdminBottomNav({ onRequestLogout }) {
  const location = useLocation();
  const currentPath = location.pathname;

  const isDashboard = currentPath === '/admin';
  const isNew = currentPath.startsWith('/admin/new');
  const isProfiles = currentPath.startsWith('/admin/profiles') || currentPath.startsWith('/admin/candidates');
  const isCompleted = currentPath.startsWith('/admin/completed');

  return (
    <nav className="admin-bottom-nav" aria-label="Mobile Navigation">
      <Link
        to="/admin"
        className={`admin-bottom-nav-item ${isDashboard ? 'active' : ''}`}
        aria-label="Dashboard"
      >
        <LayoutDashboard size={19} />
        <span>Dashboard</span>
      </Link>

      <Link
        to="/admin/new"
        className={`admin-bottom-nav-item ${isNew ? 'active' : ''}`}
        aria-label="New"
      >
        <Clock size={19} />
        <span>New</span>
      </Link>

      <Link
        to="/admin/profiles"
        className={`admin-bottom-nav-item ${isProfiles ? 'active' : ''}`}
        aria-label="Profiles"
      >
        <Users size={19} />
        <span>Profiles</span>
      </Link>

      <Link
        to="/admin/completed"
        className={`admin-bottom-nav-item ${isCompleted ? 'active' : ''}`}
        aria-label="Completed"
      >
        <CheckCircle2 size={19} />
        <span>Completed</span>
      </Link>

      <button
        type="button"
        className="admin-bottom-nav-item admin-bottom-nav-logout"
        onClick={onRequestLogout}
        aria-label="Logout"
      >
        <LogOut size={19} />
        <span>Logout</span>
      </button>
    </nav>
  );
}
