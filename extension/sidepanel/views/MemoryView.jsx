import React, { useState } from 'react';
import { Card, Chip } from '../components/Card';
import { Button } from '../components/Button';
import { SearchInput, ConfirmDialog } from '../components/SearchInput';
import { RotateCcw, X, Download, Trash2, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { mockInitialTasks, mockShoppingComparison, mockResearchData } from '../data/mock';

/**
 * 8. Memory View
 * - Layered, human-friendly presentation of the 4 memory layers WITHOUT jargon:
 *   - "Right now" (live context)
 *   - "This session" (tasks, sites visited)
 *   - "Remembered" (saved products, resources, preferences)
 *   - "Active tasks" (task cards with status and "Resume" button)
 * - Resume banner: "Pick up where you left off: Laptop comparison (Amazon, Flipkart done)"
 * - Search field to filter memory
 * - Clear all browsing context with confirm dialog
 */
export function MemoryView({ onResumeTask, onClearMemory }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState(mockInitialTasks);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const [rememberedItems, setRememberedItems] = useState([
    { id: 'rem_1', type: 'product', title: 'Dell XPS 13 9340 (₹1,18,990)', date: 'Today' },
    { id: 'rem_2', type: 'topic', title: 'Data Structures: Linked Lists', date: 'Yesterday' },
    { id: 'rem_3', type: 'article', title: 'How Large Language Models Are Changing Search', date: '2 days ago' }
  ]);

  function handleRemoveItem(id) {
    setRememberedItems((prev) => prev.filter((i) => i.id !== id));
  }

  function handleRemoveTask(taskId) {
    setTasks((prev) => prev.filter((t) => t.task_id !== taskId));
  }

  function handleClearAll() {
    setTasks([]);
    setRememberedItems([]);
    setConfirmClearOpen(false);
    onClearMemory && onClearMemory();
  }

  // Filter items
  const filteredRemembered = rememberedItems.filter((i) =>
    i.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
      {/* Resume Banner (Context Continuity Hero!) */}
      {tasks.length > 0 && (
        <Card style={{ backgroundColor: 'var(--accent-soft)', borderColor: 'rgba(196, 98, 63, 0.35)', padding: '14px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '4px' }}>
            <RotateCcw size={13} /> Pick up where you left off
          </div>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '3px' }}>
            Laptop comparison: Dell XPS 13
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '10px' }}>
            Amazon and Flipkart comparisons are ready. Next: Review Flipkart ₹4,200 discount.
          </p>
          <Button
            variant="primary"
            size="sm"
            iconRight={ArrowRight}
            onClick={() => onResumeTask && onResumeTask(tasks[0])}
          >
            Resume comparison task
          </Button>
        </Card>
      )}

      {/* Search Memory */}
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Filter remembered items and tasks..."
      />

      {/* Layer 4: Active Tasks */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Active tasks ({tasks.length})
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
            Workflow state
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {tasks.map((task) => (
            <Card key={task.task_id} style={{ padding: '12px 14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>
                  {task.title}
                </span>
                <button
                  type="button"
                  title="Remove task"
                  onClick={() => handleRemoveTask(task.task_id)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: '2px' }}
                >
                  <X size={14} />
                </button>
              </div>

              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Visited: {task.visited_websites.join(', ')} · {task.updatedAt}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 500 }}>
                  Next: {task.next_action}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onResumeTask && onResumeTask(task)}
                >
                  Resume
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Layer 3: Remembered Items */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Remembered items ({filteredRemembered.length})
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
            Long-term vault
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {filteredRemembered.map((item) => (
            <Card key={item.id} style={{ padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text)' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                  {item.type} · Saved {item.date}
                </div>
              </div>
              <button
                type="button"
                title="Remove item"
                onClick={() => handleRemoveItem(item.id)}
                style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer', padding: '4px' }}
              >
                <X size={14} />
              </button>
            </Card>
          ))}
        </div>
      </div>

      {/* Layer 1 & 2: Right Now & This Session */}
      <Card variant="subtle" style={{ padding: '12px 14px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '6px' }}>
          Session Memory Scope
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.45, margin: 0 }}>
          Browsify keeps a rolling trail of your current browsing session in <code>chrome.storage.local</code>. Context is never shared with third parties or advertisers.
        </p>
      </Card>

      {/* Footer Controls */}
      <div style={{ display: 'flex', gap: '8px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
        <Button
          variant="danger-soft"
          size="sm"
          icon={Trash2}
          style={{ flex: 1 }}
          onClick={() => setConfirmClearOpen(true)}
        >
          Clear all browsing context
        </Button>

        <Button
          variant="secondary"
          size="sm"
          icon={Download}
          onClick={() => alert('Browsify data exported as JSON.')}
        >
          Export
        </Button>
      </div>

      <ConfirmDialog
        isOpen={confirmClearOpen}
        title="Clear all stored context?"
        message="This will wipe your active shopping tasks, saved curriculum roadmaps, and recent observation trails."
        confirmText="Clear all data"
        onConfirm={handleClearAll}
        onCancel={() => setConfirmClearOpen(false)}
      />
    </div>
  );
}
