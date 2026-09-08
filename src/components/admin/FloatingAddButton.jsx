import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export function FloatingAddButton({ to = '/admin/candidates/new', title = 'Add Candidate' }) {
  return (
    <Link
      to={to}
      className="admin-fab-btn"
      title={title}
      aria-label="Add new candidate"
    >
      <Plus size={26} strokeWidth={2.5} />
      <span className="admin-fab-tooltip">{title}</span>
    </Link>
  );
}
