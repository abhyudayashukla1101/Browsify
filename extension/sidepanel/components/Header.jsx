import React from 'react';
import { Compass, Settings, Pause, Play, Sparkles } from 'lucide-react';
import { StatusPill } from './StatusPill';
import { IconButton } from './Button';

/**
 * Header (sticky, cream, subtle bottom border)
 * - Row 1: Brand logo mark + wordmark, Status pill ("Observing", "Paused", "Suggesting", "Acting"), Pause toggle, Settings
 * - Row 2: Instant Scenario Switcher for Hackathon Demo:
 *          DEMO: [Shopping] [Education] [Research] [Framer MCP] [Memory]
 */
export function Header({
  status = 'Observing',
  isPaused = false,
  onTogglePause,
  onOpenSettings,
  currentScenario = 'shopping',
  onSelectScenario
}) {
  const demoScenarios = [
    { id: 'shopping', label: 'Shopping' },
    { id: 'learning', label: 'Education' },
    { id: 'research', label: 'Research' },
    { id: 'framermcp', label: 'Framer MCP' },
    { id: 'memory', label: 'Memory' }
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
        userSelect: 'none'
      }}
    >
      {/* Row 1: Main Brand & Status Bar */}
      <div
        style={{
          padding: '12px 16px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Brand logo & wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--accent)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '13px'
            }}
          >
            B
          </div>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '16px',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--text)'
            }}
          >
            browsify
          </span>
        </div>

        {/* Header Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <StatusPill status={isPaused ? 'Paused' : status} />

          <button
            type="button"
            onClick={onTogglePause}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '4px 6px',
              fontSize: '11px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              borderRadius: 'var(--radius-xs)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {isPaused ? <Play size={12} /> : <Pause size={12} />}
            {isPaused ? 'Resume' : 'Pause'}
          </button>

          <IconButton
            icon={Settings}
            label="Settings & Privacy"
            size="sm"
            variant="ghost"
            onClick={onOpenSettings}
          />
        </div>
      </div>

      {/* Row 2: 1-Click Demo Bar (from Hackathon Demo Image 2) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          padding: '4px 16px 10px',
          overflowX: 'auto',
          whiteSpace: 'nowrap'
        }}
      >
        <span
          style={{
            fontSize: '10px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--text-tertiary)',
            marginRight: '2px'
          }}
        >
          DEMO:
        </span>

        {demoScenarios.map((s) => {
          const isActive = currentScenario === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onSelectScenario && onSelectScenario(s.id)}
              style={{
                padding: '3px 8px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid',
                borderColor: isActive ? 'var(--text)' : 'var(--border)',
                backgroundColor: isActive ? 'var(--text)' : 'var(--surface)',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                fontSize: '11px',
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
