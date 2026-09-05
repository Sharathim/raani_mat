import React from 'react';
import { STATUS_LABELS } from '../../utils/constants';
import { CircleDot } from 'lucide-react';

export function StatusBadge({ status = 'new' }) {
  const info = STATUS_LABELS[status] || STATUS_LABELS.new;

  return (
    <span className={`status-badge ${info.class}`}>
      <CircleDot size={10} />
      <span>{info.label}</span>
    </span>
  );
}
