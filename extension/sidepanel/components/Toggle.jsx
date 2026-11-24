import React from 'react';

export function Toggle({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  id
}) {
  const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <label
      htmlFor={toggleId}
      style={{
        display: 'flex',
        alignItems: description ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        gap: '12px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        opacity: disabled ? 0.6 : 1
      }}
    >
      {(label || description) && (
        <div style={{ flex: 1 }}>
          {label && (
            <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text)' }}>
              {label}
            </div>
          )}
          {description && (
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: 1.4 }}>
              {description}
            </div>
          )}
        </div>
      )}

      <div
        style={{
          width: '38px',
          height: '22px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: checked ? 'var(--accent)' : 'var(--border-strong)',
          position: 'relative',
          transition: 'background-color var(--transition-base)',
          flexShrink: 0
        }}
      >
        <input
          id={toggleId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange && onChange(e.target.checked)}
          style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
        />
        <span
          style={{
            position: 'absolute',
            top: '3px',
            left: checked ? '19px' : '3px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            boxShadow: 'var(--shadow-sm)',
            transition: 'left var(--transition-fast)'
          }}
        />
      </div>
    </label>
  );
}
