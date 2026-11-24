import React, { useState } from 'react';
import { FavIcon } from './Skeleton';
import { Popover } from './Popover';
import { Check } from 'lucide-react';

/**
 * PageStrip
 * Under header: favicon + domain + page title (truncated) + intent chip with confidence
 * + tiny "Not right?" link that opens intent-correction popover.
 */
export function PageStrip({
  pageContext,
  onCorrectIntent
}) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const { domain, title, intent = 'shopping', confidence = 0.91 } = pageContext || {};
  const confidencePercent = Math.round(confidence * 100);

  const intentLabels = {
    shopping: 'Shopping',
    learning: 'Learning',
    research: 'Research',
    productivity: 'Productivity',
    unknown: 'Browsing'
  };

  const intentColorMap = {
    shopping: 'var(--intent-shopping)',
    learning: 'var(--intent-learning)',
    research: 'var(--intent-research)',
    productivity: 'var(--intent-productivity)',
    unknown: 'var(--text-tertiary)'
  };

  const correctionOptions = [
    { id: 'shopping', label: 'Shopping & comparing' },
    { id: 'learning', label: 'Learning & studying' },
    { id: 'research', label: 'Research & reading' },
    { id: 'productivity', label: 'Productivity / workflow' },
    { id: 'unknown', label: 'Just browsing quietly' }
  ];

  return (
    <div
      style={{
        padding: '8px 16px',
        backgroundColor: 'var(--bg-subtle)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px',
        fontSize: '12px',
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1 }}>
        <FavIcon domain={domain} size={15} />
        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text)' }}>
          <span style={{ fontWeight: 500 }}>{domain || 'active tab'}</span>
          {title && <span style={{ color: 'var(--text-tertiary)', marginLeft: '6px' }}>— {title}</span>}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 7px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            fontSize: '11px',
            color: 'var(--text)',
            fontWeight: 500
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: intentColorMap[intent] || 'var(--text-tertiary)'
            }}
          />
          <span>{intentLabels[intent] || 'Observing'} · {confidencePercent}%</span>
        </span>

        <button
          type="button"
          onClick={() => setPopoverOpen(!popoverOpen)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '11px',
            color: 'var(--accent)',
            cursor: 'pointer',
            padding: '2px 4px',
            textDecoration: 'underline'
          }}
        >
          Not right?
        </button>

        {/* Intent Correction Popover */}
        <Popover isOpen={popoverOpen} onClose={() => setPopoverOpen(false)}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: '8px', textTransform: 'uppercase' }}>
            What are you doing here?
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {correctionOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  onCorrectIntent && onCorrectIntent(opt.id);
                  setPopoverOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 8px',
                  borderRadius: 'var(--radius-xs)',
                  border: 'none',
                  backgroundColor: intent === opt.id ? 'var(--bg-subtle)' : 'transparent',
                  color: intent === opt.id ? 'var(--accent)' : 'var(--text)',
                  fontSize: '12px',
                  fontWeight: intent === opt.id ? 500 : 400,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <span>{opt.label}</span>
                {intent === opt.id && <Check size={13} />}
              </button>
            ))}
          </div>
        </Popover>
      </div>
    </div>
  );
}
