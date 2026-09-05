import React from 'react';
import { AlertCircle } from 'lucide-react';

export function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  required = false,
  error,
  hint,
  disabled = false,
  autoComplete = 'off',
  min,
  max,
  step
}) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        <span>
          {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
        </span>
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        autoComplete={autoComplete}
        min={min}
        max={max}
        step={step}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
        className={`form-input ${error ? 'error' : ''}`}
      />

      {hint && !error && (
        <span id={`${name}-hint`} className="form-hint">
          {hint}
        </span>
      )}

      {error && (
        <span id={`${name}-error`} className="form-error" role="alert">
          <AlertCircle size={13} />
          {error}
        </span>
      )}
    </div>
  );
}
