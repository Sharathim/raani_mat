import React from 'react';

export function StatsCard({ title, count, icon: Icon, color = 'var(--maroon-900)', highlight = false, subtitle }) {
  return (
    <div
      className={`admin-stat-card ${highlight ? 'highlighted' : ''}`}
    >
      <div className="admin-stat-top">
        <span className="admin-stat-title">
          {title}
        </span>
        {Icon && (
          <div
            className="admin-stat-icon-wrap"
            style={{ color: color }}
          >
            <Icon size={16} />
          </div>
        )}
      </div>

      <div className="admin-stat-bottom">
        <div className="admin-stat-count">
          {count}
        </div>
        {subtitle && (
          <span className="admin-stat-subtitle" title={subtitle}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
