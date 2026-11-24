import React, { useState } from 'react';
import { Card, Chip } from '../components/Card';
import { Button } from '../components/Button';
import { Toggle } from '../components/Toggle';
import { Slider } from '../components/Slider';
import { ShieldCheck, Lock, Sliders, Eye, Plus, X, Trash2 } from 'lucide-react';

/**
 * 9. Settings / Privacy View
 * - Observation (master on/off, Pause for 15 min / 1 hour / until I resume)
 * - Excluded sites (domain chips with add/remove, defaults like banking and email)
 * - Autonomy level (3-stop slider: "Ask me first" / "Balanced" / "More automatic" with 60%/85% threshold diagram)
 * - Data & storage (what is stored, clear data)
 * - Appearance (comfortable/compact density; light only)
 * - "Privacy promise" card
 */
export function SettingsView({ onClearData }) {
  const [observeEnabled, setObserveEnabled] = useState(true);
  const [pauseDuration, setPauseDuration] = useState('none');
  const [autonomyLevel, setAutonomyLevel] = useState(1); // 0: Ask me first, 1: Balanced, 2: More automatic
  const [excludedDomains, setExcludedDomains] = useState([
    'onlinesbi.sbi',
    'hdfcbank.com',
    'paypal.com',
    'mail.google.com',
    'login.live.com'
  ]);
  const [newDomain, setNewDomain] = useState('');
  const [density, setDensity] = useState('comfortable');

  function handleAddDomain(e) {
    e.preventDefault();
    if (!newDomain.trim()) return;
    const clean = newDomain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    if (!excludedDomains.includes(clean)) {
      setExcludedDomains([...excludedDomains, clean]);
    }
    setNewDomain('');
  }

  function handleRemoveDomain(d) {
    setExcludedDomains(excludedDomains.filter((item) => item !== d));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
      <div>
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)', marginBottom: '2px' }}>
          Settings & Privacy Controls
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          Configure observation permissions, website exclusions, and autonomy limits.
        </p>
      </div>

      {/* Observation Master Settings */}
      <Card>
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.04em' }}>
          Observation & Pausing
        </div>

        <Toggle
          checked={observeEnabled}
          onChange={setObserveEnabled}
          label="Observe browsing with permission"
          description="Enables Browsify's central intelligence engine to analyze pages as you navigate."
        />

        <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
          <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text)', marginBottom: '6px' }}>
            Quick Pause Duration:
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[
              { id: '15m', label: '15 mins' },
              { id: '1h', label: '1 hour' },
              { id: 'indefinite', label: 'Until I resume' }
            ].map((dur) => (
              <button
                key={dur.id}
                type="button"
                onClick={() => setPauseDuration(dur.id)}
                style={{
                  flex: 1,
                  padding: '5px 8px',
                  borderRadius: 'var(--radius-xs)',
                  border: '1px solid',
                  borderColor: pauseDuration === dur.id ? 'var(--accent)' : 'var(--border)',
                  backgroundColor: pauseDuration === dur.id ? 'var(--accent-soft)' : 'var(--surface)',
                  color: pauseDuration === dur.id ? 'var(--accent)' : 'var(--text)',
                  fontSize: '11px',
                  fontWeight: pauseDuration === dur.id ? 600 : 400,
                  cursor: 'pointer'
                }}
              >
                {dur.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Autonomy Level Slider & Threshold Diagram */}
      <Card>
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
          Autonomy Thresholds
        </div>

        <div style={{ marginBottom: '12px' }}>
          <Slider
            value={autonomyLevel}
            onChange={setAutonomyLevel}
            labels={['Ask me first', 'Balanced (Default)', 'More automatic']}
          />
        </div>

        {/* Visual Diagram of Thresholds */}
        <div
          style={{
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 12px',
            fontSize: '11px',
            color: 'var(--text-secondary)',
            lineHeight: 1.5
          }}
        >
          {autonomyLevel === 0 && (
            <div>
              <strong>Ask me first:</strong> Browsify will only suggest actions. It will never perform comparisons or roadmaps automatically.
            </div>
          )}
          {autonomyLevel === 1 && (
            <div>
              <strong>Balanced:</strong> Safe reversible actions (spec comparisons, topic notes) run above 85% with an 8-second Undo option.
            </div>
          )}
          {autonomyLevel === 2 && (
            <div>
              <strong>More automatic:</strong> Autonomous actions initiate at 75% confidence. Form submissions still strictly require approval.
            </div>
          )}
        </div>
      </Card>

      {/* Excluded Websites */}
      <Card>
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
          Excluded Websites
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
          Browsify is automatically disabled on these domains. No context is read or stored:
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
          {excludedDomains.map((domain) => (
            <span
              key={domain}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 8px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                fontSize: '11px',
                color: 'var(--text)'
              }}
            >
              <span>{domain}</span>
              <button
                type="button"
                onClick={() => handleRemoveDomain(domain)}
                style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: 0 }}
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>

        <form onSubmit={handleAddDomain} style={{ display: 'flex', gap: '6px' }}>
          <input
            type="text"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            placeholder="e.g. yourbank.com"
            style={{
              flex: 1,
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              fontSize: '12px',
              color: 'var(--text)'
            }}
          />
          <Button variant="secondary" size="sm" type="submit" icon={Plus}>
            Exclude
          </Button>
        </form>
      </Card>

      {/* Privacy Promise Card */}
      <Card style={{ backgroundColor: 'var(--success-soft)', borderColor: 'rgba(95, 138, 91, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--success)', marginBottom: '8px' }}>
          <ShieldCheck size={16} /> Privacy Guarantees
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px', color: 'var(--text)', lineHeight: 1.6 }}>
          <li>✓ No passwords or credit cards collected</li>
          <li>✓ Session cookies are never transmitted</li>
          <li>✓ Observation is opt-in and easily paused</li>
          <li>✓ API keys remain securely on backend</li>
        </ul>
      </Card>
    </div>
  );
}
