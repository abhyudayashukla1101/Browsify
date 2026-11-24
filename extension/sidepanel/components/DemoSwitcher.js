/**
 * Browsify - DemoSwitcher Component
 * Clean, segmented scenario bar for rapid pitch demonstration.
 */

export function renderDemoSwitcher(activeScenario) {
  return `
    <div class="demo-strip">
      <span class="demo-strip-label">Demo:</span>
      <button class="demo-btn ${activeScenario === 'shopping' ? 'active' : ''}" data-scenario="shopping">
        Shopping
      </button>
      <button class="demo-btn ${activeScenario === 'education' ? 'active' : ''}" data-scenario="education">
        Education
      </button>
      <button class="demo-btn ${activeScenario === 'research' ? 'active' : ''}" data-scenario="research">
        Research
      </button>
      <button class="demo-btn ${activeScenario === 'memory' ? 'active' : ''}" data-scenario="memory">
        Memory
      </button>
      <button id="btn-open-demo-hub" class="demo-btn" style="margin-left: auto; color: var(--accent-blue);" title="Open test hub in new tab">
        Hub ↗
      </button>
    </div>
  `;
}
