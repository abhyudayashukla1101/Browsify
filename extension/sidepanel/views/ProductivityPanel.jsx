import React, { useState } from 'react';
import { Card, Chip } from '../components/Card';
import { Button } from '../components/Button';
import { Clock, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { mockProductivityData } from '../data/mock';

/**
 * 7. Productivity Panel
 * - "Patterns I noticed" cards (e.g. morning routine, non-sensitive autofill)
 * - Clear guarantee: sensitive fields (passwords, cards) are never autofilled
 * - Actions: "Set up", "Dismiss"
 */
export function ProductivityPanel() {
  const [patterns, setPatterns] = useState(mockProductivityData.patterns);
  const [dismissed, setDismissed] = useState({});

  function handleDismiss(id) {
    setDismissed((prev) => ({ ...prev, [id]: true }));
  }

  const visiblePatterns = patterns.filter((p) => !dismissed[p.id]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
      <div>
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>
          Productivity & Routines
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          Browsify identifies recurring browsing workflows and suggests safe automations.
        </p>
      </div>

      {visiblePatterns.length === 0 ? (
        <Card variant="subtle" style={{ textAlign: 'center', padding: '24px' }}>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            All detected routine recommendations have been reviewed.
          </p>
        </Card>
      ) : (
        visiblePatterns.map((p) => (
          <Card key={p.id} variant="raised">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <Chip intent="productivity" size="sm">
                {p.type === 'routine' ? 'Workflow pattern' : 'Safe autofill'}
              </Chip>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                Observed over 5 days
              </span>
            </div>

            <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>
              {p.title}
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '12px' }}>
              {p.description}
            </p>

            {p.disclaimer && (
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--text-tertiary)',
                  padding: '6px 8px',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-xs)',
                  marginBottom: '12px'
                }}
              >
                🔒 {p.disclaimer}
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px' }}>
              <Button variant="primary" size="sm" icon={Sparkles}>
                {p.actionLabel}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleDismiss(p.id)}>
                Dismiss
              </Button>
            </div>
          </Card>
        ))
      )}

      {/* Safety Notice */}
      <Card variant="subtle">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <ShieldAlert size={16} color="var(--warning)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
            Automations are strictly client-side. Browsify never shares your navigation routines or credentials with external third parties.
          </p>
        </div>
      </Card>
    </div>
  );
}
