import React from 'react';
import { AlertCircle } from 'lucide-react';
import { CustomSelect } from './CustomSelect';

export function SelectField({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = '-- Select an option --',
  required = false,
  error,
  hint,
  disabled = false
}) {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="form-label">
          <span>
            {label} {required && <span style={{ color: 'var(--danger)' }}>*</span>}
          </span>
        </label>
      )}

      <CustomSelect
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        disabled={disabled}
        className={error ? 'error' : ''}
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
