import React from 'react';

export function Skeleton({ width = '100%', height = '16px', borderRadius = 'var(--radius-xs)', style = {} }) {
  return (
    <div
      className="skeleton-shimmer"
      style={{
        width,
        height,
        borderRadius,
        ...style
      }}
    />
  );
}

export function EmptyState({
  icon: Icon,
  title = 'No items yet',
  description = 'Browsify is quietly observing in the background.',
  action
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '36px 20px',
        color: 'var(--text-secondary)'
      }}
    >
      {Icon && (
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--bg-subtle)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent)',
            marginBottom: '14px'
          }}
        >
          <Icon size={24} />
        </div>
      )}
      <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>
        {title}
      </h3>
      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', maxWidth: '240px', lineHeight: 1.5, marginBottom: action ? '16px' : 0 }}>
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}

export function FavIcon({ domain, size = 16 }) {
  const initial = domain ? domain.replace(/^www\./, '').charAt(0).toUpperCase() : 'B';

  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: '3px',
        backgroundColor: 'var(--bg-subtle)',
        border: '1px solid var(--border)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `${Math.round(size * 0.65)}px`,
        fontWeight: 600,
        color: 'var(--text-secondary)',
        flexShrink: 0
      }}
    >
      {initial}
    </span>
  );
}

export function Badge({ children, variant = 'default', size = 'sm' }) {
  const styles = {
    default: { bg: 'var(--bg-subtle)', text: 'var(--text-secondary)', border: 'var(--border)' },
    accent: { bg: 'var(--accent-soft)', text: 'var(--accent)', border: 'rgba(196,98,63,0.3)' },
    success: { bg: 'var(--success-soft)', text: 'var(--success)', border: 'rgba(95,138,91,0.3)' },
    info: { bg: 'var(--info-soft)', text: 'var(--info)', border: 'rgba(92,124,153,0.3)' }
  };

  const s = styles[variant] || styles.default;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: size === 'sm' ? '2px 7px' : '4px 10px',
        borderRadius: 'var(--radius-full)',
        fontSize: size === 'sm' ? '11px' : '12px',
        fontWeight: 600,
        backgroundColor: s.bg,
        color: s.text,
        border: `1px solid ${s.border}`
      }}
    >
      {children}
    </span>
  );
}
