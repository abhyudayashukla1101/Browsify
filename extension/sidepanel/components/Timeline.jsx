import React from 'react';
import { FavIcon } from './Skeleton';

export function Timeline({ events = [] }) {
  if (!events.length) return null;

  const intentColorMap = {
    shopping: 'var(--intent-shopping)',
    learning: 'var(--intent-learning)',
    research: 'var(--intent-research)',
    productivity: 'var(--intent-productivity)',
    unknown: 'var(--text-tertiary)'
  };

  return (
    <div style={{ position: 'relative', paddingLeft: '14px' }}>
      {/* Soft vertical guideline */}
      <div
        style={{
          position: 'absolute',
          top: '8px',
          bottom: '8px',
          left: '4px',
          width: '1px',
          backgroundColor: 'var(--border)'
        }}
      />

      {events.map((evt) => {
        const dotColor = intentColorMap[evt.intent] || 'var(--text-tertiary)';

        return (
          <div
            key={evt.id}
            style={{
              position: 'relative',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px'
            }}
          >
            {/* Timeline node dot */}
            <span
              style={{
                position: 'absolute',
                left: '-14px',
                top: '5px',
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: dotColor,
                border: '2px solid var(--bg)',
                boxShadow: '0 0 0 1px var(--border-strong)'
              }}
            />

            <FavIcon domain={evt.domain} size={16} />

            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: '12px',
                  color: 'var(--text)',
                  fontWeight: 500,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {evt.action}
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  color: 'var(--text-tertiary)',
                  marginTop: '1px'
                }}
              >
                <span>{evt.domain}</span>
                <span>•</span>
                <span>{evt.time}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
