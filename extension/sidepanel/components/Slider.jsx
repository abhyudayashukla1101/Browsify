import React from 'react';

/**
 * Slider - Accessible 3-stop range control or numerical slider
 */
export function Slider({
  value = 1, // 0: Ask me first, 1: Balanced, 2: More automatic
  min = 0,
  max = 2,
  step = 1,
  onChange,
  labels = ['Ask me first', 'Balanced', 'More automatic']
}) {
  return (
    <div style={{ width: '100%' }}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange && onChange(Number(e.target.value))}
        style={{
          width: '100%',
          accentColor: 'var(--accent)',
          cursor: 'pointer',
          height: '6px'
        }}
      />
      {labels && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: 'var(--text-secondary)',
            marginTop: '6px'
          }}
        >
          {labels.map((lbl, idx) => (
            <span
              key={lbl}
              style={{
                fontWeight: value === idx ? 600 : 400,
                color: value === idx ? 'var(--accent)' : 'var(--text-tertiary)'
              }}
            >
              {lbl}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
