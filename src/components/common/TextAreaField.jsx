import React from 'react';
import { AlertCircle } from 'lucide-react';

export function TextAreaField({
  labelTa,
  labelEn,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  rows = 4,
  required = false,
  error,
  hint,
  disabled = false
}) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        <span className="form-label-tamil">
          {labelTa} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
        </span>
        {labelEn && <span className="form-label-en">({labelEn})</span>}
      </label>

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
        className={`form-textarea ${error ? 'error' : ''}`}
      />

      {hint && !error && (
        <span id={`${name}-hint`} className="form-hint">
          {hint}
        </span>
      )}

      {error && (
        <span id={`${name}-error`} className="form-error" role="alert">
          <AlertCircle size={14} />
          {error}
        </span>
      )}
    </div>
  );
}
