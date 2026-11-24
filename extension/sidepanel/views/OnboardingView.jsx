import React, { useState } from 'react';
import { Shield, Eye, Lock, ArrowRight, Check } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Toggle } from '../components/Toggle';

/**
 * 1. Onboarding / Consent View (first run, full panel)
 * - Warm welcome with serif headline "Browse naturally." and a one-line explanation.
 * - Clear, honest "What Browsify can see" and "What it never collects"
 * - Opt-in toggles
 * - 3 short steps
 */
export function OnboardingView({ onComplete }) {
  const [step, setStep] = useState(1);
  const [observeOptIn, setObserveOptIn] = useState(true);
  const [autoActionsOptIn, setAutoActionsOptIn] = useState(false);

  return (
    <div
      style={{
        padding: '24px 20px',
        backgroundColor: 'var(--bg)',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
      className="animate-fade-in"
    >
      <div>
        {/* Step indicator */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
          {[1, 2, 3].map((s) => (
            <span
              key={s}
              style={{
                height: '4px',
                flex: 1,
                borderRadius: 'var(--radius-full)',
                backgroundColor: s <= step ? 'var(--accent)' : 'var(--border-strong)',
                transition: 'background-color var(--transition-base)'
              }}
            />
          ))}
        </div>

        {/* STEP 1: Welcome & Mission */}
        {step === 1 && (
          <div className="animate-fade-in">
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--accent-soft)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px'
              }}
            >
              <Eye size={22} />
            </div>

            <h1 style={{ fontSize: '26px', marginBottom: '10px' }}>
              Browse naturally.
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
              Browsify is a quiet, proactive AI companion. It understands what you're trying to accomplish — shopping, learning, or researching — and handles the repetitive tasks without waiting for prompts.
            </p>

            <Card variant="subtle" style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>
                How it assists you
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                <li>• Compares prices and specs while you research products</li>
                <li>• Tracks study roadmaps across educational portals</li>
                <li>• Synthesizes academic articles and preserves context</li>
              </ul>
            </Card>
          </div>
        )}

        {/* STEP 2: Privacy Guarantee */}
        {step === 2 && (
          <div className="animate-fade-in">
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--success-soft)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px'
              }}
            >
              <Shield size={22} />
            </div>

            <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>
              Your privacy, respected.
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
              Browsify was designed with privacy as a foundational architecture, not an afterthought.
            </p>

            <Card style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--success)', marginBottom: '6px' }}>
                <Check size={16} /> What Browsify sees
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                Page titles, public URLs, and visible content on pages where observation is permitted.
              </p>
            </Card>

            <Card style={{ marginBottom: '16px', backgroundColor: 'var(--bg-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>
                <Lock size={15} /> What Browsify NEVER collects
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                Passwords, credit cards, payment details, form inputs, banking sessions, or cookies.
              </p>
            </Card>
          </div>
        )}

        {/* STEP 3: Opt-in Preferences */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>
              Choose your autonomy.
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '24px' }}>
              You control how proactively Browsify acts. You can adjust this anytime in Settings.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <Card>
                <Toggle
                  checked={observeOptIn}
                  onChange={setObserveOptIn}
                  label="Observe my browsing (Required)"
                  description="Allows Browsify to analyze page metadata with your explicit consent."
                />
              </Card>

              <Card>
                <Toggle
                  checked={autoActionsOptIn}
                  onChange={setAutoActionsOptIn}
                  label="Allow safe automatic actions"
                  description="When confidence is high (>85%), auto-runs harmless tasks like comparisons with an 8-second Undo option."
                />
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
        {step > 1 && (
          <Button variant="ghost" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}

        {step < 3 ? (
          <Button
            variant="primary"
            style={{ flex: 1 }}
            iconRight={ArrowRight}
            onClick={() => setStep(step + 1)}
          >
            Continue
          </Button>
        ) : (
          <Button
            variant="primary"
            disabled={!observeOptIn}
            style={{ flex: 1 }}
            onClick={() => onComplete && onComplete({ observeOptIn, autoActionsOptIn })}
          >
            Start browsing with Browsify
          </Button>
        )}
      </div>
    </div>
  );
}
