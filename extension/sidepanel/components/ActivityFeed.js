/**
 * Browsify - ActivityFeed Component (Framer Style)
 * Clean white aesthetic with squircle icon action cards and subtle typography.
 */

export function renderActivityFeed(intentData, liveContext) {
  const confidencePercent = Math.round((intentData.confidence || 0) * 100);

  let badgeColor = 'badge-default';
  if (confidencePercent >= 85) badgeColor = 'badge-green';
  else if (confidencePercent >= 60) badgeColor = 'badge-blue';

  const suggestionsHtml = (intentData.suggestions || []).map(sugg => {
    // Select clean minimalist icon glyph
    let iconChar = '↗';
    if (sugg.actionTab === 'shopping') iconChar = '🛍️';
    else if (sugg.actionTab === 'learning') iconChar = '📚';
    else if (sugg.actionTab === 'research') iconChar = '📄';

    return `
      <div class="framer-card" data-action-tab="${sugg.actionTab || 'activity'}" data-action-id="${sugg.id}">
        <div class="framer-icon-box">
          ${iconChar}
        </div>
        <div class="framer-card-content">
          <div class="framer-card-title">${sugg.title}</div>
          <div class="framer-card-desc">${sugg.description}</div>
        </div>
        <div class="framer-card-action">
          View <span>→</span>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="activity-feed">
      <!-- Live Intent Overview -->
      <div class="card">
        <div class="card-header">
          <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">
            Current Activity
          </span>
          <span class="badge ${badgeColor}">
            ${intentData.label || 'Observing'}
          </span>
        </div>

        <h3 style="font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; line-height: 1.4;">
          ${intentData.summary || 'Observing browsing context...'}
        </h3>
        <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px;">
          ${liveContext && liveContext.domain ? liveContext.domain : 'Waiting for navigation'}
        </div>

        <!-- Minimalist Confidence Indicator -->
        <div class="progress-wrapper">
          <div class="progress-labels">
            <span>Confidence</span>
            <span style="font-weight: 600; color: var(--text-primary);">${confidencePercent}%</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${confidencePercent}%;"></div>
          </div>
        </div>

        <!-- Explanation Note -->
        <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--border-light); font-size: 11px; color: var(--text-secondary); line-height: 1.5;">
          ${intentData.reasoning || 'Browsify is passively monitoring page context with user permission.'}
        </div>
      </div>

      <!-- Framer-Style Proactive Suggestions -->
      <div style="margin-top: 18px;">
        <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); margin-bottom: 10px;">
          Suggested Actions
        </div>
        ${suggestionsHtml || '<div class="card" style="font-size: 11px; color: var(--text-muted); text-align: center; padding: 16px;">No actions pending. Continue browsing naturally.</div>'}
      </div>
    </div>
  `;
}
