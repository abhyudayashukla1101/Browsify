import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * BottomComposer (optional, minimal, secondary)
 * Rounded input: "Ask Browsify anything about this page..." with send button.
 * Kept visually quiet to emphasize the proactive nature of the product.
 */
export function BottomComposer({ onSendMessage }) {
  const [text, setText] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onSendMessage && onSendMessage(text.trim());
    setText('');
  }

  return (
    <div
      style={{
        padding: '10px 16px',
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        userSelect: 'none'
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'var(--surface)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-full)',
          padding: '4px 6px 4px 14px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ask Browsify anything about this page..."
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            outline: 'none',
            fontSize: '12px',
            color: 'var(--text)',
            fontFamily: 'var(--font-sans)'
          }}
        />

        <button
          type="submit"
          disabled={!text.trim()}
          aria-label="Send message"
          style={{
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            backgroundColor: text.trim() ? 'var(--accent)' : 'var(--border)',
            color: '#FFFFFF',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: text.trim() ? 'pointer' : 'default',
            transition: 'background-color var(--transition-fast)'
          }}
        >
          <ArrowUp size={14} />
        </button>
      </form>
    </div>
  );
}
