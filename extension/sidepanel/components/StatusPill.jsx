import React from 'react';

/**
 * StatusPill
 * States:
 * - "Observing" (soft pulsing green)
 * - "Paused" (grey)
 * - "Suggesting" (terracotta)
 * - "Acting" (blue)
 */
export function StatusPill({ status = 'Observing', onClick }) {
  const configs = {
    Observing: {
      dotColor: 'var(--success)',
      label: 'Observing',
      pulsing: true,
      bg: 'var(--success-soft)',
      border: 'rgba(95, 138, 91, 0.25)'
    },
    Paused: {
      dotColor: 'var(--text-tertiary)',
      label: 'Paused',
      pulsing: false,
      bg: 'var(--bg-subtle)',
      border: 'var(--border)'
    },
    Suggesting: {
      dotColor: 'var(--accent)',
      label: 'Suggesting',
      pulsing: false,
      bg: 'var(--accent-soft)',
      border: 'rgba(196, 98, 63, 0.25)'
    },
    Acting: {
      dotColor: 'var(--info)',
      label: 'Acting',
      pulsing: true,
      bg: 'var(--info-soft)',
      border: 'rgba(92, 124, 153, 0.25)'
    }
  };

  const c = configs[status] || configs.Observing;

  return (
    <div
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '3px 10px',
        borderRadius: 'var(--radius-full)',
        backgroundColor: c.bg,
        border: `1px solid ${c.border}`,
        fontSize: '12px',
        fontWeight: 500,
        color: 'var(--text)',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none'
      }}
      className="browsify-status-pill"
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          backgroundColor: c.dotColor,
          display: 'inline-block'
        }}
        className={c.pulsing ? 'pulsing-dot' : ''}
      />
      <span>{c.label}</span>
    </div>
  );
}
