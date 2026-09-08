import React from 'react';
import { FolderSearch } from 'lucide-react';

export function EmptyState({
  titleEn = 'No candidate registrations yet',
  description = 'New profile submissions will automatically appear here.',
  action
}) {
  return (
    <div className="admin-empty-state">
      <div className="admin-empty-icon-wrap">
        <FolderSearch size={24} />
      </div>
      <h3 className="admin-empty-title">
        {titleEn}
      </h3>
      <p className="admin-empty-desc">
        {description}
      </p>
      {action && <div className="admin-empty-action">{action}</div>}
    </div>
  );
}
