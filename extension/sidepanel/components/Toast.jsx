import React, { useEffect, useState } from 'react';
import { Undo2, X } from 'lucide-react';

/**
 * Toast - Warm floating notification with 8-second countdown and Undo option
 */
export function Toast({
  message,
  undoLabel = 'Undo',
  onUndo,
  onDismiss,
  duration = 8000
}) {
  const [timeLeft, setTimeLeft] = useState(Math.round(duration / 1000));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          onDismiss && onDismiss();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration, onDismiss]);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
        left: '16px',
        right: '16px',
        backgroundColor: 'var(--surface-raised)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 14px',
        boxShadow: 'var(--shadow-popover)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        zIndex: 100
      }}
      className="animate-fade-in"
    >
      <div style={{ flex: 1, fontSize: '13px', color: 'var(--text)', lineHeight: 1.4 }}>
        {message}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {onUndo && (
          <button
            type="button"
            onClick={onUndo}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 8px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--accent-soft)',
              color: 'var(--accent)',
              fontSize: '12px',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Undo2 size={13} />
            <span>{undoLabel} ({timeLeft}s)</span>
          </button>
        )}

        <button
          type="button"
          aria-label="Dismiss toast"
          onClick={onDismiss}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-tertiary)',
            cursor: 'pointer',
            padding: '2px'
          }}
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
