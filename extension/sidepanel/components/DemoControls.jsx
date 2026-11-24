import React, { useState } from 'react';
import { Sliders, ChevronUp, ChevronDown, RefreshCw } from 'lucide-react';

/**
 * DemoControls
 * Dev-only collapsed drawer in bottom corner.
 * Simulates:
 * - Page context: Shopping / Learning / Research / Unknown
 * - Confidence: 40% (Observe quietly) / 75% (Suggest inline) / 92% (Auto-act with 8s Undo)
 * Supports the 3-minute hackathon pitch:
 * Act 1 Shopping, Act 2 Education, Act 3 Research, Act 4 Memory (resume laptop task)
 */
export function DemoControls({
  currentScenario,
  onSelectScenario,
  currentConfidence,
  onChangeConfidence,
  onReset
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '12px',
        right: '12px',
        zIndex: 180,
        fontFamily: 'var(--font-sans)',
        userSelect: 'none'
      }}
    >
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--surface-raised)',
          border: '1px solid var(--border-strong)',
          boxShadow: 'var(--shadow-popover)',
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--accent)',
          cursor: 'pointer'
        }}
      >
        <Sliders size={13} />
        <span>Demo Controls</span>
        {isOpen ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
      </button>

      {/* Expanded Control Box */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '36px',
            right: 0,
            width: '280px',
            backgroundColor: 'var(--surface-raised)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-strong)',
            boxShadow: 'var(--shadow-popover)',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
          className="animate-fade-in"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}>
              Hackathon Pitch Simulator
            </span>
            <button
              type="button"
              onClick={onReset}
              title="Reset simulation"
              style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}
            >
              <RefreshCw size={12} />
            </button>
          </div>

          {/* Scenario Buttons */}
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Active Webpage Intent:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
              {[
                { id: 'shopping', label: '🛒 Shopping' },
                { id: 'learning', label: '🎓 Learning' },
                { id: 'research', label: '🔬 Research' },
                { id: 'unknown', label: '🌐 Unknown' }
              ].map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => onSelectScenario(sc.id)}
                  style={{
                    padding: '6px 8px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid',
                    borderColor: currentScenario === sc.id ? 'var(--accent)' : 'var(--border)',
                    backgroundColor: currentScenario === sc.id ? 'var(--accent-soft)' : 'var(--surface)',
                    color: currentScenario === sc.id ? 'var(--accent)' : 'var(--text)',
                    fontSize: '11px',
                    fontWeight: currentScenario === sc.id ? 600 : 400,
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Autonomy Confidence Level */}
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Confidence & Autonomy Behavior:
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[
                { val: 0.44, label: '<60% (Quiet)' },
                { val: 0.75, label: '75% (Suggest)' },
                { val: 0.92, label: '>85% (Auto-act)' }
              ].map((lvl) => (
                <button
                  key={lvl.val}
                  type="button"
                  onClick={() => onChangeConfidence(lvl.val)}
                  style={{
                    flex: 1,
                    padding: '5px 4px',
                    borderRadius: 'var(--radius-xs)',
                    border: '1px solid',
                    borderColor: Math.abs(currentConfidence - lvl.val) < 0.05 ? 'var(--accent)' : 'var(--border)',
                    backgroundColor: Math.abs(currentConfidence - lvl.val) < 0.05 ? 'var(--accent-soft)' : 'var(--surface)',
                    color: Math.abs(currentConfidence - lvl.val) < 0.05 ? 'var(--accent)' : 'var(--text)',
                    fontSize: '10px',
                    fontWeight: Math.abs(currentConfidence - lvl.val) < 0.05 ? 600 : 400,
                    cursor: 'pointer'
                  }}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
