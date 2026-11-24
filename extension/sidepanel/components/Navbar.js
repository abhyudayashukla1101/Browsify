/**
 * Browsify - Navbar Component (Framer/Linear Style)
 */
export function renderNavbar(state) {
  const isPaused = state.isPaused;
  const statusClass = isPaused ? 'paused' : '';
  const statusText = isPaused ? 'Paused' : 'Active';

  return `
    <header class="app-header">
      <div class="brand-wrapper">
        <div class="brand-logo-mark">B</div>
        <div class="brand-name">browsify</div>
      </div>
      
      <div class="header-actions">
        <div class="status-indicator">
          <span class="status-dot ${statusClass}"></span>
          <span>${statusText}</span>
        </div>
        <button id="btn-toggle-pause-header" class="btn btn-white" style="padding: 3px 8px; font-size: 11px;">
          ${isPaused ? 'Resume' : 'Pause'}
        </button>
      </div>
    </header>
  `;
}
