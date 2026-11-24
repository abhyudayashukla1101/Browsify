import React from 'react';
import { Search, X } from 'lucide-react';

export function SearchInput({
  value = '',
  onChange,
  placeholder = 'Filter memory...',
  className = ''
}) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '100%'
      }}
      className={className}
    >
      <Search
        size={14}
        color="var(--text-tertiary)"
        style={{ position: 'absolute', left: '10px', pointerEvents: 'none' }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '7px 28px 7px 30px',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '12px',
          color: 'var(--text)',
          fontFamily: 'var(--font-sans)',
          outline: 'none',
          transition: 'border-color var(--transition-fast)'
        }}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange && onChange('')}
          style={{
            position: 'absolute',
            right: '8px',
            background: 'none',
            border: 'none',
            color: 'var(--text-tertiary)',
            cursor: 'pointer',
            padding: '2px'
          }}
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
}

export function ConfirmDialog({
  isOpen = false,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Clear all data',
  cancelText = 'Cancel',
  isDanger = true,
  onConfirm,
  onCancel
}) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(43, 42, 39, 0.45)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        zIndex: 220
      }}
      onClick={onCancel}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '340px',
          backgroundColor: 'var(--surface-raised)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-strong)',
          padding: '20px',
          boxShadow: 'var(--shadow-popover)'
        }}
        className="animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>
          {title}
        </h3>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '18px' }}>
          {message}
        </p>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              fontSize: '12px',
              color: 'var(--text)',
              cursor: 'pointer'
            }}
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: isDanger ? 'var(--danger)' : 'var(--accent)',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
