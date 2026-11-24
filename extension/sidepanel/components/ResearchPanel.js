/**
 * Browsify - ResearchPanel Component (Framer Style)
 * Clean editorial design for paper summaries and saved research items.
 */

export function renderResearchPanel(researchData, savedResearchItems) {
  const takeawaysHtml = researchData.keyTakeaways.map(t => `
    <li style="margin-bottom: 8px; display: flex; align-items: flex-start; gap: 8px; font-size: 12px; color: var(--text-secondary); line-height: 1.5;">
      <span style="color: var(--text-primary); font-weight: 700;">•</span>
      <span>${t}</span>
    </li>
  `).join('');

  const glossaryHtml = researchData.glossary.map(g => `
    <div style="background: var(--bg-secondary); border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 8px 10px; margin-bottom: 6px;">
      <div style="font-weight: 600; font-size: 11px; color: var(--text-primary);">${g.term}</div>
      <div style="font-size: 11px; color: var(--text-secondary); margin-top: 2px;">${g.definition}</div>
    </div>
  `).join('');

  return `
    <div class="research-panel">
      <!-- Paper Overview Card -->
      <div class="card">
        <div class="card-header">
          <span class="badge badge-default">Research Article</span>
          <button id="btn-save-paper-vault" class="btn btn-black" style="padding: 4px 10px; font-size: 11px;">
            Save to Vault
          </button>
        </div>

        <h3 style="font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; line-height: 1.4;">
          ${researchData.paperTitle}
        </h3>
        <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px;">
          ${researchData.authors}
        </div>

        <div style="background: var(--bg-secondary); border: 1px solid var(--border-light); padding: 12px; border-radius: var(--radius-sm); margin-bottom: 14px;">
          <div style="font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); margin-bottom: 4px;">
            Executive Summary
          </div>
          <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.55;">
            ${researchData.executiveSummary}
          </p>
        </div>

        <div>
          <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); margin-bottom: 8px;">
            Key Takeaways
          </div>
          <ul style="list-style: none; padding-left: 0;">
            ${takeawaysHtml}
          </ul>
        </div>
      </div>

      <!-- Terminology Glossary -->
      <div class="card">
        <div class="card-title" style="margin-bottom: 8px;">
          Extracted Terminology
        </div>
        ${glossaryHtml}
      </div>

      <!-- Saved Vault Items -->
      <div style="margin-top: 14px;">
        <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); margin-bottom: 8px; display: flex; justify-content: space-between;">
          <span>Research Vault</span>
          <span>${savedResearchItems.length} saved</span>
        </div>
        ${savedResearchItems.length === 0 ? `
          <div class="card" style="padding: 14px; text-align: center; color: var(--text-muted); font-size: 11px;">
            No saved articles yet. Click "Save to Vault" to bookmark this paper.
          </div>
        ` : savedResearchItems.map(item => `
          <div class="framer-card" style="margin-bottom: 6px; padding: 10px 12px;">
            <div class="framer-card-content">
              <div class="framer-card-title">${item.title || item.paperTitle}</div>
              <div class="framer-card-desc">Saved • ${new Date(item.savedAt || Date.now()).toLocaleDateString()}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
