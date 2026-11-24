import React from 'react';

export function Button({
  children,
  variant = 'primary', // primary | secondary | ghost | danger-soft
  size = 'md', // sm | md
  className = '',
  icon: Icon,
  iconRight: IconRight,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    borderRadius: 'var(--radius-sm)',
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.55 : 1,
    transition: 'all var(--transition-fast)',
    textDecoration: 'none',
    userSelect: 'none',
    whiteSpace: 'nowrap'
  };

  const sizeStyles = {
    sm: {
      padding: '5px 10px',
      fontSize: '12px',
      lineHeight: '1.3'
    },
    md: {
      padding: '8px 14px',
      fontSize: '13px',
      lineHeight: '1.4'
    }
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--accent)',
      color: '#FFFFFF',
      borderColor: 'var(--accent)',
      boxShadow: 'var(--shadow-sm)'
    },
    secondary: {
      backgroundColor: 'var(--surface)',
      color: 'var(--text)',
      borderColor: 'var(--border-strong)',
      boxShadow: 'var(--shadow-sm)'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--text-secondary)',
      borderColor: 'transparent'
    },
    'danger-soft': {
      backgroundColor: 'var(--danger-soft)',
      color: 'var(--danger)',
      borderColor: 'rgba(181, 71, 63, 0.2)'
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant]
      }}
      className={`browsify-btn ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : 16} />}
      <span>{children}</span>
      {IconRight && <IconRight size={size === 'sm' ? 14 : 16} />}
    </button>
  );
}

export function IconButton({
  icon: Icon,
  label,
  size = 'md',
  variant = 'ghost',
  onClick,
  active = false,
  className = '',
  ...props
}) {
  const sizes = {
    sm: { width: 28, height: 28, iconSize: 15 },
    md: { width: 34, height: 34, iconSize: 17 }
  };

  const s = sizes[size] || sizes.md;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      style={{
        width: s.width,
        height: s.height,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius-sm)',
        background: active ? 'var(--bg-subtle)' : variant === 'secondary' ? 'var(--surface)' : 'transparent',
        border: variant === 'secondary' ? '1px solid var(--border)' : '1px solid transparent',
        color: active ? 'var(--accent)' : 'var(--text-secondary)',
        cursor: 'pointer',
        transition: 'all var(--transition-fast)'
      }}
      className={`browsify-icon-btn ${className}`}
      {...props}
    >
      <Icon size={s.iconSize} />
    </button>
  );
}
