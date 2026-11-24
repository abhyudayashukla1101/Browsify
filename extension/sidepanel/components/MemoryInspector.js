/**
 * Browsify - MemoryInspector Component (Framer Style)
 * Clean, transparent visualizer for the 4-Tier Memory Hierarchy.
 */

export function renderMemoryInspector(memoryState) {
  const { layer1_live, layer2_session, layer3_longterm, layer4_taskState, isPaused, excludedDomains } = memoryState;

  const sessionItemsHtml = (layer2_session || []).slice(0, 5).map(item => `
    <div style="font-size: 11px; padding: 6px 8px; background: var(--bg-secondary); border-radius: var(--radius-xs); margin-bottom: 4px; display: flex; justify-content: space-between; border: 1px solid var(--border-light);">
      <span style="color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 210px;">
        ${item.title || item.url}
      </span>
      <span style="color: var(--text-muted); font-size: 10px;">${new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    </div>
  `).join('') || '<div style="color: var(--text-muted); font-size: 11px;">No session events recorded yet.</div>';

  const taskKeys = Object.keys(layer4_taskState || {});
  const taskItemsHtml = taskKeys.length > 0 ? taskKeys.map(k => {
    const t = layer4_taskState[k];
    return `
      <div style="background: var(--bg-secondary); border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 8px 10px; margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 600; color: var(--text-primary); font-size: 11px;">${t.task_id || k}</span>
          <span class="badge badge-default" style="font-size: 10px;">${t.status || 'in_progress'}</span>
        </div>
        <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">${t.title || t.intent}</div>
        <div style="font-size: 10px; color: var(--text-muted); margin-top: 2px;">Next: ${t.next_action || 'awaiting_user'}</div>
      </div>
    `;
  }).join('') : '<div style="color: var(--text-muted); font-size: 11px;">No active tasks right now.</div>';

  return `
    <div class="memory-inspector">
      <!-- Privacy Settings Card -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">
            Privacy & Monitoring
          </span>
          <label class="switch">
            <input type="checkbox" id="btn-toggle-pause-memory" ${!isPaused ? 'checked' : ''}>
            <span class="slider"></span>
          </label>
        </div>
        <p style="font-size: 11px; color: var(--text-secondary); margin-bottom: 10px; line-height: 1.4;">
          ${isPaused ? 'Monitoring is paused. Browsify is not recording activity.' : 'Monitoring is active with user permission. Passwords and financial data are strictly excluded.'}
        </p>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-light); padding-top: 10px;">
          <span style="font-size: 11px; color: var(--text-muted);">Excluded: ${excludedDomains.join(', ')}</span>
          <button id="btn-clear-memory" class="btn btn-white" style="padding: 3px 8px; font-size: 11px; color: #dc2626;">
            Purge Memory
          </button>
        </div>
      </div>

      <!-- Layer 1: Live Context -->
      <div class="card">
        <div class="card-title" style="margin-bottom: 6px;">
          Layer 1: Live Context
        </div>
        <div style="font-size: 11px; color: var(--text-secondary); line-height: 1.5;">
          ${layer1_live ? `
            <div><strong>Active URL:</strong> <span style="word-break: break-all; color: var(--text-primary);">${layer1_live.url || 'None'}</span></div>
            <div><strong>Domain:</strong> ${layer1_live.domain || 'N/A'}</div>
            <div><strong>Page Title:</strong> ${layer1_live.title || 'Untitled'}</div>
            <div><strong>Schemas:</strong> ${(layer1_live.jsonLd || []).length} structured objects parsed</div>
          ` : 'Waiting for tab context...'}
        </div>
      </div>

      <!-- Layer 2: Session Memory -->
      <div class="card">
        <div class="card-title" style="margin-bottom: 6px;">
          Layer 2: Session Memory
        </div>
        <div>
          ${sessionItemsHtml}
        </div>
      </div>

      <!-- Layer 4: Task State -->
      <div class="card">
        <div class="card-title" style="margin-bottom: 4px;">
          Layer 4: Task State
        </div>
        <p style="font-size: 11px; color: var(--text-muted); margin-bottom: 8px;">
          Retains active shopping comparisons and learning roadmaps across tabs.
        </p>
        ${taskItemsHtml}
      </div>

      <!-- Layer 3: Long-Term Memory -->
      <div class="card">
        <div class="card-title" style="margin-bottom: 6px;">
          Layer 3: Long-Term Vault
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div style="background: var(--bg-secondary); border: 1px solid var(--border-light); padding: 8px 10px; border-radius: var(--radius-sm);">
            <div style="font-size: 18px; font-weight: 700; color: var(--text-primary);">${(layer3_longterm.shopping || []).length}</div>
            <div style="font-size: 10px; color: var(--text-muted);">Saved Products</div>
          </div>
          <div style="background: var(--bg-secondary); border: 1px solid var(--border-light); padding: 8px 10px; border-radius: var(--radius-sm);">
            <div style="font-size: 18px; font-weight: 700; color: var(--text-primary);">${(layer3_longterm.research || []).length}</div>
            <div style="font-size: 10px; color: var(--text-muted);">Archived Papers</div>
          </div>
        </div>
      </div>
    </div>
  `;
}
