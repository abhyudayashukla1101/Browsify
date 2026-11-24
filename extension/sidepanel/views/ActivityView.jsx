import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ConfidenceMeter } from '../components/ConfidenceMeter';
import { Timeline } from '../components/Timeline';
import { Sparkles, Check, X, Undo2, ArrowRight } from 'lucide-react';

/**
 * 2. Activity View (Home)
 * - "What I think you're doing" hero card with confidence meter and 60%/85% threshold ticks
 * - One-line reasoning with "That's right" / "Not quite"
 * - Behavior states:
 *   - <60%: "Just watching quietly. I'll chime in when I can help."
 *   - 60-85%: inline suggestion card
 *   - >85%: "Auto-done" card with Undo button
 * - Vertical softly-lined timeline of recent observations
 */
export function ActivityView({
  pageContext,
  timeline = [],
  onOpenCorrection,
  onAcceptSuggestion,
  onDismissSuggestion,
  onUndoAutoAction,
  onNavigateTab
}) {
  const { intent = 'unknown', confidence = 0.5, reasoning, suggestion } = pageContext || {};
  const isHighConfidence = confidence >= 0.85;
  const isMediumConfidence = confidence >= 0.60 && confidence < 0.85;
  const isLowConfidence = confidence < 0.60;

  const intentTitles = {
    shopping: 'Comparing Laptops & Prices',
    learning: 'Studying Data Structures',
    research: 'Reading Academic Search Research',
    productivity: 'Reviewing Daily Workflow',
    unknown: 'Browsing Naturally'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
      {/* "What I think you're doing" Hero Card */}
      <Card variant="raised">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-tertiary)', letterSpacing: '0.04em' }}>
            What I noticed
          </span>
          <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 500 }}>
            Active task
          </span>
        </div>

        <h2 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>
          {intentTitles[intent] || 'Observing browsing context'}
        </h2>

        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
          {reasoning || "Browsify observes your open pages with permission to anticipate what assistance you might need."}
        </p>

        {/* Confidence Meter with 60% and 85% ticks */}
        <div style={{ marginBottom: '16px' }}>
          <ConfidenceMeter confidence={confidence} />
        </div>

        {/* Feedback Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
            Is this intent accurate?
          </span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <Button variant="ghost" size="sm" icon={Check} onClick={() => {}}>
              That's right
            </Button>
            <Button variant="ghost" size="sm" icon={X} onClick={onOpenCorrection}>
              Not quite
            </Button>
          </div>
        </div>
      </Card>

      {/* BEHAVIOR STATE 1: High Confidence (>85%) -> Auto-done Card with Undo */}
      {isHighConfidence && (
        <Card style={{ backgroundColor: 'var(--success-soft)', borderColor: 'rgba(95, 138, 91, 0.3)' }} className="animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--success)' }}>
              <Sparkles size={16} />
              <span>Auto-prepared comparison table</span>
            </div>
            <button
              type="button"
              onClick={onUndoAutoAction}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 8px',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'var(--surface)',
                border: '1px solid rgba(95, 138, 91, 0.3)',
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--success)',
                cursor: 'pointer'
              }}
            >
              <Undo2 size={12} />
              <span>Undo</span>
            </button>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '10px' }}>
            Because confidence is {Math.round(confidence * 100)}% (exceeding 85%), Browsify autonomously extracted laptop specifications and queried comparable Flipkart listings.
          </p>
          <Button
            variant="secondary"
            size="sm"
            iconRight={ArrowRight}
            onClick={() => onNavigateTab && onNavigateTab('progress')}
          >
            Review comparison results
          </Button>
        </Card>
      )}

      {/* BEHAVIOR STATE 2: Medium Confidence (60-85%) -> Inline Suggestion Card */}
      {isMediumConfidence && suggestion && (
        <Card style={{ backgroundColor: 'var(--accent-soft)', borderColor: 'rgba(196, 98, 63, 0.3)' }} className="animate-fade-in">
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.04em' }}>
            Suggested Action · {Math.round(confidence * 100)}%
          </div>
          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>
            {suggestion}
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '12px' }}>
            Browsify can search 2 comparable e-commerce sites in the background and highlight the lowest available price.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="primary" size="sm" onClick={onAcceptSuggestion}>
              Do it
            </Button>
            <Button variant="ghost" size="sm" onClick={onDismissSuggestion}>
              Not now
            </Button>
          </div>
        </Card>
      )}

      {/* BEHAVIOR STATE 3: Low Confidence (<60%) -> Quiet Observation Note */}
      {isLowConfidence && (
        <Card variant="subtle">
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.5 }}>
            Just watching quietly. I'll chime in when I can anticipate something helpful.
          </p>
        </Card>
      )}

      {/* Recent Activity Timeline */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Recent observations
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
            Session context
          </span>
        </div>
        <Timeline events={timeline} />
      </div>
    </div>
  );
}
