import React from 'react';
import { AlertCircle } from 'lucide-react';

export function SelectField({
  label,
  name,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder = '-- Select an option --',
  required = false,
  error,
  hint,
  disabled = false
}) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        <span>
          {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
        </span>
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : hint ? `${name}-hint` : undefined}
        className={`form-select ${error ? 'error' : ''}`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt, idx) => {
          if (typeof opt === 'string') {
            return (
              <option key={`${opt}-${idx}`} value={opt}>
                {opt}
              </option>
            );
          }
          return (
            <option key={`${opt.value}-${idx}`} value={opt.value}>
              {opt.label || opt.labelEn || opt.value}
            </option>
          );
        })}
      </select>

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
