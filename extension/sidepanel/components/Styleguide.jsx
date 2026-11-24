import React, { useState } from 'react';
import { Button, IconButton } from './Button';
import { Card, Chip } from './Card';
import { StatusPill } from './StatusPill';
import { Toggle } from './Toggle';
import { Slider } from './Slider';
import { Tabs } from './Tabs';
import { ConfidenceMeter, ProgressBar, ProgressRing } from './ConfidenceMeter';
import { Toast } from './Toast';
import { Modal } from './Modal';
import { ApprovalModal } from './ApprovalModal';
import { Skeleton, EmptyState, Badge, FavIcon } from './Skeleton';
import { Timeline } from './Timeline';
import { SearchInput, ConfirmDialog } from './SearchInput';
import { Sparkles, CheckCircle2, ShieldAlert, Compass, Activity, Lightbulb, Database, BookOpen } from 'lucide-react';

/**
 * Styleguide View (dev-only route showing all variants on warm cream background)
 */
export function Styleguide({ onBack }) {
  const [toggleState, setToggleState] = useState(true);
  const [sliderVal, setSliderVal] = useState(1);
  const [activeTab, setActiveTab] = useState('one');
  const [modalOpen, setModalOpen] = useState(false);
  const [approvalOpen, setApprovalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  return (
    <div style={{ padding: '24px', backgroundColor: 'var(--bg)', minHeight: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 600 }}>Browsify Design System</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Warm cream, soft contrast, calm paper-like components.
          </p>
        </div>
        {onBack && (
          <Button variant="secondary" size="sm" onClick={onBack}>
            ← Back to Panel
          </Button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {/* Buttons */}
        <section>
          <h2 style={{ fontSize: '16px', marginBottom: '12px' }}>Buttons</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            <Button variant="primary">Primary terracotta</Button>
            <Button variant="secondary">Secondary surface</Button>
            <Button variant="ghost">Ghost button</Button>
            <Button variant="danger-soft">Danger soft</Button>
            <Button variant="primary" size="sm">Small button</Button>
            <Button variant="primary" icon={Sparkles}>With icon</Button>
            <IconButton icon={Compass} label="Compass icon" />
            <IconButton icon={ShieldAlert} variant="secondary" label="Shield icon" />
          </div>
        </section>

        {/* Status Pills & Chips */}
        <section>
          <h2 style={{ fontSize: '16px', marginBottom: '12px' }}>Status Pills & Intent Chips</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            <StatusPill status="Observing" />
            <StatusPill status="Suggesting" />
            <StatusPill status="Acting" />
            <StatusPill status="Paused" />
            <Chip intent="shopping">Shopping · ₹1,18,990</Chip>
            <Chip intent="learning">Learning · 88%</Chip>
            <Chip intent="research">Research · 94%</Chip>
            <Chip intent="productivity">Productivity</Chip>
            <Badge variant="success">Completed</Badge>
            <Badge variant="accent">Best price</Badge>
          </div>
        </section>

        {/* Confidence Meter */}
        <section>
          <h2 style={{ fontSize: '16px', marginBottom: '12px' }}>Confidence Meter (60% & 85% Ticks)</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '380px' }}>
            <ConfidenceMeter confidence={0.44} />
            <ConfidenceMeter confidence={0.75} />
            <ConfidenceMeter confidence={0.91} />
          </div>
        </section>

        {/* Progress & Rings */}
        <section>
          <h2 style={{ fontSize: '16px', marginBottom: '12px' }}>Progress Bars & Rings</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <ProgressRing progress={33} size={54} />
            <div style={{ flex: 1, maxWidth: '240px' }}>
              <ProgressBar value={2} max={6} />
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                2 of 6 topics complete
              </div>
            </div>
          </div>
        </section>

        {/* Toggles, Sliders & Tabs */}
        <section>
          <h2 style={{ fontSize: '16px', marginBottom: '12px' }}>Toggles, Sliders & Segmented Tabs</h2>
          <div style={{ maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Toggle
              checked={toggleState}
              onChange={setToggleState}
              label="Observe browsing with permission"
              description="Passively analyzes page titles and context."
            />
            <Slider value={sliderVal} onChange={setSliderVal} />
            <Tabs
              activeTab={activeTab}
              onChange={setActiveTab}
              tabs={[
                { id: 'one', label: 'Activity', icon: Activity },
                { id: 'two', label: 'Suggestions', icon: Lightbulb, badge: 2 },
                { id: 'three', label: 'Memory', icon: Database }
              ]}
            />
          </div>
        </section>

        {/* Search & Timeline */}
        <section>
          <h2 style={{ fontSize: '16px', marginBottom: '12px' }}>Search & Timeline</h2>
          <div style={{ maxWidth: '380px' }}>
            <SearchInput value={searchVal} onChange={setSearchVal} />
            <div style={{ marginTop: '16px' }}>
              <Timeline
                events={[
                  { id: '1', time: 'Just now', domain: 'amazon.in', action: 'Opened Dell XPS 13', intent: 'shopping' },
                  { id: '2', time: '12m ago', domain: 'geeksforgeeks.org', action: 'Studied Linked Lists', intent: 'learning' }
                ]}
              />
            </div>
          </div>
        </section>

        {/* Modals & Dialogs */}
        <section>
          <h2 style={{ fontSize: '16px', marginBottom: '12px' }}>Modals & Toast</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button variant="secondary" onClick={() => setModalOpen(true)}>Open Modal</Button>
            <Button variant="secondary" onClick={() => setApprovalOpen(true)}>Open Approval Modal</Button>
            <Button variant="secondary" onClick={() => setConfirmOpen(true)}>Open Confirm</Button>
            <Button variant="primary" onClick={() => setToastOpen(true)}>Trigger Toast</Button>
          </div>
        </section>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Standard Modal">
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            This is a clean, accessible dialog on the cream surface.
          </p>
        </Modal>

        <ApprovalModal
          isOpen={approvalOpen}
          onClose={() => setApprovalOpen(false)}
          onApprove={() => setApprovalOpen(false)}
        />

        <ConfirmDialog
          isOpen={confirmOpen}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => setConfirmOpen(false)}
        />

        {toastOpen && (
          <Toast
            message="Laptop comparison auto-saved to memory."
            onUndo={() => setToastOpen(false)}
            onDismiss={() => setToastOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
