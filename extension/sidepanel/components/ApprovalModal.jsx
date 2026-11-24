import React from 'react';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';

/**
 * ApprovalModal
 * Plain-language summary of what will happen, what data is involved,
 * "Approve" and "Cancel", with the security note:
 * "Browsify never completes purchases without you."
 */
export function ApprovalModal({
  isOpen = false,
  onClose,
  onApprove,
  actionTitle = 'Sensitive Action Requires Approval',
  actionDescription = 'Browsify noticed an automated action that involves personal or financial data.',
  involvedData = ['Non-sensitive form inputs (name, email)'],
  isFinancial = false
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="380px">
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: isFinancial ? 'var(--danger-soft)' : 'var(--accent-soft)',
            color: isFinancial ? 'var(--danger)' : 'var(--accent)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '10px'
          }}
        >
          {isFinancial ? <ShieldAlert size={22} /> : <ShieldCheck size={22} />}
        </div>

        <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>
          {actionTitle}
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {actionDescription}
        </p>
      </div>

      <div
        style={{
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)',
          padding: '12px 14px',
          marginBottom: '18px'
        }}
      >
        <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.04em' }}>
          Data involved
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '12px', color: 'var(--text)' }}>
          {involvedData.map((item, idx) => (
            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span style={{ color: 'var(--accent)', fontSize: '14px' }}>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          fontSize: '11px',
          color: 'var(--text-secondary)',
          lineHeight: 1.45,
          marginBottom: '20px',
          padding: '8px 10px',
          backgroundColor: 'var(--surface)',
          borderRadius: 'var(--radius-xs)',
          borderLeft: '3px solid var(--accent)'
        }}
      >
        <strong>Security Guarantee:</strong> Browsify never completes purchases, submits passwords, or modifies accounts without your manual authorization.
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <Button variant="secondary" onClick={onClose} style={{ flex: 1 }}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onApprove} style={{ flex: 1 }}>
          Approve action
        </Button>
      </div>
    </Modal>
  );
}
