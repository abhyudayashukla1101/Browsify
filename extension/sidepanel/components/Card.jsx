import React from 'react';

export function Card({
  children,
  className = '',
  variant = 'default', // default | subtle | raised
  hoverable = false,
  onClick,
  style = {},
  ...props
}) {
  const bg = variant === 'subtle' ? 'var(--bg-subtle)' : variant === 'raised' ? 'var(--surface-raised)' : 'var(--surface)';

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: bg,
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        padding: '16px',
        boxShadow: variant === 'raised' ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transition: 'all var(--transition-base)',
        cursor: hoverable ? 'pointer' : 'default',
        ...style
      }}
      className={`browsify-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function Chip({
  children,
  intent, // shopping | learning | research | productivity | default
  color,
  active = false,
  onClick,
  size = 'md',
  icon: Icon,
  className = '',
  ...props
}) {
  const intentColors = {
    shopping: { bg: 'var(--accent-soft)', text: 'var(--accent)', border: 'rgba(196, 98, 63, 0.25)' },
    learning: { bg: 'var(--success-soft)', text: 'var(--success)', border: 'rgba(95, 138, 91, 0.25)' },
    research: { bg: 'var(--info-soft)', text: 'var(--info)', border: 'rgba(92, 124, 153, 0.25)' },
    productivity: { bg: '#F2EAF3', text: 'var(--intent-productivity)', border: 'rgba(139, 107, 143, 0.25)' },
    default: { bg: 'var(--bg-subtle)', text: 'var(--text-secondary)', border: 'var(--border)' }
  };

  const scheme = intentColors[intent] || intentColors.default;

  return (
    <span
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        padding: size === 'sm' ? '2px 8px' : '4px 10px',
        borderRadius: 'var(--radius-full)',
        fontSize: size === 'sm' ? '11px' : '12px',
        fontWeight: 500,
        backgroundColor: active ? scheme.text : scheme.bg,
        color: active ? '#FFFFFF' : scheme.text,
        border: `1px solid ${scheme.border}`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all var(--transition-fast)'
      }}
      className={`browsify-chip ${className}`}
      {...props}
    >
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
}
