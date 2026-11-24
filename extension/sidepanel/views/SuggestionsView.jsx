import React, { useState } from 'react';
import { Card, Chip } from '../components/Card';
import { Button } from '../components/Button';
import { EmptyState } from '../components/Skeleton';
import { ApprovalModal } from '../components/ApprovalModal';
import { Lightbulb, Lock, ArrowRight, MoreHorizontal } from 'lucide-react';

/**
 * 3. Suggestions View
 * - Stack of SuggestionCards with intent dot, title, one-line why, confidence chip,
 *   primary "Do it", secondary "Not now", tertiary "Never for this site".
 * - Cards with sensitive actions show lock/shield badge and open ApprovalModal.
 */
export function SuggestionsView({
  suggestions = [],
  onExecuteAction,
  onDismissAction,
  onExcludeSite
}) {
  const [activeApproval, setActiveApproval] = useState(null);

  const defaultSuggestions = [
    {
      id: 'sugg_01',
      intent: 'shopping',
      title: 'Compare this laptop across sites',
      why: 'You opened Dell XPS 13 on Amazon. Flipkart has a verified listing ₹4,200 cheaper.',
      confidence: 0.91,
      isSensitive: false,
      targetTab: 'shopping'
    },
    {
      id: 'sugg_02',
      intent: 'learning',
      title: 'Add Linked Lists to study tracker',
      why: 'You studied node pointer manipulation for 12 minutes on GeeksforGeeks.',
      confidence: 0.88,
      isSensitive: false,
      targetTab: 'learning'
    },
    {
      id: 'sugg_03',
      intent: 'productivity',
      title: 'Autofill shipping address and contact',
      why: 'Checkout form detected. Requires explicit authorization to paste contact details.',
      confidence: 0.84,
      isSensitive: true,
      sensitiveData: ['Shipping address', 'Email address', 'Contact phone number']
    }
  ];

  const list = suggestions.length ? suggestions : defaultSuggestions;

  function handleActionClick(item) {
    if (item.isSensitive) {
      setActiveApproval(item);
    } else {
      onExecuteAction && onExecuteAction(item);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} className="animate-fade-in">
      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
        Proactive actions anticipated from your active browsing:
      </div>

      {list.length === 0 ? (
        <EmptyState
          icon={Lightbulb}
          title="No suggestions right now"
          description="Browse naturally — Browsify will offer suggestions when relevant tasks are detected."
        />
      ) : (
        list.map((item) => (
          <Card key={item.id} variant="raised" style={{ padding: '14px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Chip intent={item.intent} size="sm">
                  {item.intent}
                </Chip>
                {item.isSensitive && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'var(--danger-soft)',
                      color: 'var(--danger)',
                      fontSize: '11px',
                      fontWeight: 600
                    }}
                  >
                    <Lock size={11} /> Approval required
                  </span>
                )}
              </div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)' }}>
                {Math.round(item.confidence * 100)}%
              </span>
            </div>

            <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>
              {item.title}
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '14px' }}>
              {item.why}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <Button variant="primary" size="sm" onClick={() => handleActionClick(item)}>
                  Do it
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDismissAction && onDismissAction(item.id)}>
                  Not now
                </Button>
              </div>

              <button
                type="button"
                title="Never suggest for this website"
                onClick={() => onExcludeSite && onExcludeSite(item)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-tertiary)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <MoreHorizontal size={15} />
              </button>
            </div>
          </Card>
        ))
      )}

      {/* Sensitive Approval Modal */}
      {activeApproval && (
        <ApprovalModal
          isOpen={true}
          actionTitle={activeApproval.title}
          actionDescription={activeApproval.why}
          involvedData={activeApproval.sensitiveData || ['Contact info']}
          isFinancial={false}
          onClose={() => setActiveApproval(null)}
          onApprove={() => {
            onExecuteAction && onExecuteAction(activeApproval);
            setActiveApproval(null);
          }}
        />
      )}
    </div>
  );
}
