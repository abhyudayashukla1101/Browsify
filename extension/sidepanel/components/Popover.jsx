import React from 'react';

export function Popover({
  isOpen = false,
  onClose,
  children,
  position = 'bottom-right'
}) {
  if (!isOpen) return null;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 90
        }}
        onClick={onClose}
      />
      <div
        style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '6px',
          backgroundColor: 'var(--surface-raised)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-popover)',
          padding: '12px',
          zIndex: 95,
          minWidth: '190px'
        }}
        className="animate-fade-in"
      >
        {children}
      </div>
    </>
  );
}

export function Tooltip({ text, children }) {
  const [visible, setVisible] = React.useState(false);

  return (
    <div
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && text && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '6px',
            padding: '3px 8px',
            backgroundColor: 'var(--text)',
            color: 'var(--bg)',
            fontSize: '11px',
            borderRadius: 'var(--radius-xs)',
            whiteSpace: 'nowrap',
            zIndex: 150,
            pointerEvents: 'none'
          }}
          className="animate-fade-in"
        >
          {text}
        </div>
      )}
    </div>
  );
}
