import React from 'react';
import { UserX } from 'lucide-react';

export function EmptyState({
  titleEn = 'No Profiles Found',
  description = 'New applicant profile submissions will automatically appear here.',
  icon: IconComponent = UserX,
  action
}) {
  return (
    <div className="admin-empty-state-wrapper">
      <div className="admin-empty-state-card">
        <div className="admin-empty-icon-wrap">
          <IconComponent size={32} strokeWidth={1.8} />
        </div>
        <h3 className="admin-empty-title">
          {titleEn}
        </h3>
        <p className="admin-empty-desc">
          {description}
        </p>
        {action && <div className="admin-empty-action">{action}</div>}
      </div>
    </div>
  );
}
