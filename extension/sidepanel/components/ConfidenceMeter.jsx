import React from 'react';

export function ConfidenceMeter({
  confidence = 0.5, // 0.0 to 1.0
  showTicks = true,
  showLabel = true
}) {
  const percentage = Math.round(confidence * 100);

  // Behavior bracket
  let bracketLabel = 'Observing quietly';
  let bracketColor = 'var(--text-secondary)';
  if (percentage >= 85) {
    bracketLabel = 'Safe action auto-executed';
    bracketColor = 'var(--accent)';
  } else if (percentage >= 60) {
    bracketLabel = 'Action suggested';
    bracketColor = 'var(--warning)';
  }

  return (
    <div style={{ width: '100%' }}>
      {showLabel && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            fontSize: '12px',
            marginBottom: '6px'
          }}
        >
          <span style={{ color: 'var(--text-secondary)' }}>Confidence</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 600, color: 'var(--text)' }}>{percentage}%</span>
            <span style={{ color: bracketColor, fontSize: '11px' }}>({bracketLabel})</span>
          </div>
        </div>
      )}

      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '7px',
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border)',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${percentage}%`,
            backgroundColor: 'var(--accent)',
            borderRadius: 'var(--radius-full)',
            transition: 'width var(--transition-slow)'
          }}
        />

        {/* 60% Tick */}
        {showTicks && (
          <div
            title="60% Suggestion threshold"
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '60%',
              width: '1.5px',
              backgroundColor: 'var(--border-strong)',
              zIndex: 2
            }}
          />
        )}

        {/* 85% Tick */}
        {showTicks && (
          <div
            title="85% Autonomous action threshold"
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '85%',
              width: '1.5px',
              backgroundColor: 'var(--border-strong)',
              zIndex: 2
            }}
          />
        )}
      </div>

      {showTicks && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '10px',
            color: 'var(--text-tertiary)',
            marginTop: '4px'
          }}
        >
          <span>0%</span>
          <span style={{ marginLeft: '18%' }}>60% (Suggest)</span>
          <span>85% (Auto)</span>
          <span>100%</span>
        </div>
      )}
    </div>
  );
}

export function ProgressBar({ value = 0, max = 100, color = 'var(--accent)' }) {
  const pct = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div
      style={{
        width: '100%',
        height: '6px',
        backgroundColor: 'var(--bg-subtle)',
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--border)',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          width: `${pct}%`,
          height: '100%',
          backgroundColor: color,
          borderRadius: 'var(--radius-full)',
          transition: 'width var(--transition-slow)'
        }}
      />
    </div>
  );
}

export function ProgressRing({ progress = 33, size = 52, strokeWidth = 5 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size}>
        <circle
          stroke="var(--border)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke="var(--accent)"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transition: 'stroke-dashoffset 0.5s ease-out',
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%'
          }}
        />
      </svg>
      <span
        style={{
          position: 'absolute',
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--text)'
        }}
      >
        {progress}%
      </span>
    </div>
  );
}
