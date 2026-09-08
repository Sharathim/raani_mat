import React, { useState, useRef, useEffect, useId } from 'react';
import { ChevronDown, Check } from 'lucide-react';

/**
 * CustomSelect - Accessible, fully customizable React dropdown component
 * Replaces native HTML <select> elements while preserving full form event compatibility.
 */
export function CustomSelect({
  name,
  value,
  onChange,
  options = [],
  placeholder = '-- Select an option --',
  disabled = false,
  className = '',
  style = {},
  id,
  ariaLabel
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);
  const listboxId = useId();

  // Normalize options array into [{ value, label }]
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { value: String(opt), label: String(opt) };
    }
    return {
      value: String(opt.value),
      label: String(opt.label || opt.labelEn || opt.value)
    };
  });

  // Find currently selected option
  const selectedOption = normalizedOptions.find((opt) => opt.value === String(value));

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('pointerdown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick);
    };
  }, [isOpen]);

  // Handle option selection & emit synthetic change event matching native <select>
  const handleSelectOption = (optValue) => {
    setIsOpen(false);
    if (disabled) return;

    if (onChange) {
      // Create a synthetic event payload matching standard React form input handlers
      const syntheticEvent = {
        target: {
          name: name || '',
          value: optValue
        }
      };
      onChange(syntheticEvent);
    }
  };

  // Keyboard navigation & accessibility handlers
  const handleKeyDown = (e) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0 && highlightedIndex < normalizedOptions.length) {
          handleSelectOption(normalizedOptions[highlightedIndex].value);
        } else {
          setIsOpen((prev) => !prev);
        }
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setHighlightedIndex(0);
        } else {
          setHighlightedIndex((prev) => (prev < normalizedOptions.length - 1 ? prev + 1 : 0));
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setHighlightedIndex(normalizedOptions.length - 1);
        } else {
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : normalizedOptions.length - 1));
        }
        break;

      case 'Escape':
      case 'Tab':
        if (isOpen) {
          setIsOpen(false);
        }
        break;

      default:
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`custom-select-container ${disabled ? 'disabled' : ''} ${isOpen ? 'open' : ''} ${className}`}
      style={style}
    >
      {/* Custom Dropdown Trigger Button */}
      <button
        type="button"
        id={id}
        className="custom-select-trigger"
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-label={ariaLabel || name || 'Select option'}
      >
        <span className={`custom-select-value ${!selectedOption ? 'placeholder' : ''}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <ChevronDown
          size={16}
          className={`custom-select-arrow ${isOpen ? 'rotate' : ''}`}
          aria-hidden="true"
        />
      </button>

      {/* Custom Options Menu List */}
      {isOpen && (
        <ul
          id={listboxId}
          className="custom-select-menu"
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={
            highlightedIndex >= 0 ? `${listboxId}-opt-${highlightedIndex}` : undefined
          }
        >
          {/* Default Placeholder Option */}
          {placeholder && (
            <li
              id={`${listboxId}-opt-placeholder`}
              role="option"
              aria-selected={!selectedOption}
              className={`custom-select-option placeholder-option ${!selectedOption ? 'selected' : ''}`}
              onClick={() => handleSelectOption('')}
            >
              <span>{placeholder}</span>
              {!selectedOption && <Check size={14} className="custom-option-check" />}
            </li>
          )}

          {/* Render Options */}
          {normalizedOptions.map((opt, index) => {
            const isSelected = selectedOption && selectedOption.value === opt.value;
            const isHighlighted = highlightedIndex === index;

            return (
              <li
                key={`${opt.value}-${index}`}
                id={`${listboxId}-opt-${index}`}
                role="option"
                aria-selected={isSelected}
                className={`custom-select-option ${isSelected ? 'selected' : ''} ${isHighlighted ? 'highlighted' : ''}`}
                onClick={() => handleSelectOption(opt.value)}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <span>{opt.label}</span>
                {isSelected && <Check size={14} className="custom-option-check" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
