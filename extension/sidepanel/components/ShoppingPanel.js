/**
 * Browsify - ShoppingPanel Component (Framer Style)
 * Clean white comparison tables, crisp pricing, and minimalist alternative listings.
 */

export function renderShoppingPanel(shoppingData) {
  const current = shoppingData.currentProduct;
  const alts = shoppingData.alternatives;

  return `
    <div class="shopping-panel">
      <!-- Active Product Card -->
      <div class="card">
        <div class="card-header">
          <span class="badge badge-default">Viewing</span>
          <span style="font-size: 18px; font-weight: 700; color: var(--text-primary); letter-spacing: -0.02em;">
            ${current.price}
          </span>
        </div>
        
        <h3 style="font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; line-height: 1.4;">
          ${current.title}
        </h3>
        
        <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 14px;">
          ${current.store} • ${current.rating}
        </div>

        <div style="display: flex; gap: 8px;">
          <button id="btn-save-product-vault" class="btn btn-black" style="flex: 1;">
            Save Product
          </button>
          <button id="btn-track-price-drop" class="btn btn-white" style="flex: 1;">
            Track Price
          </button>
        </div>
      </div>

      <!-- Clean Comparison Matrix -->
      <div class="card">
        <div class="card-title" style="margin-bottom: 8px;">
          Hardware Comparison
        </div>

        <table class="clean-table">
          <thead>
            <tr>
              <th>Specification</th>
              <th style="color: var(--text-primary); font-weight: 700;">MacBook Air M3</th>
              <th>Dell XPS 15</th>
              <th>ThinkPad X1</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Price</strong></td>
              <td class="highlight"><strong>$1,299</strong></td>
              <td>$1,449</td>
              <td>$1,380</td>
            </tr>
            <tr>
              <td><strong>Processor</strong></td>
              <td class="highlight">Apple M3 (8c/10g)</td>
              <td>i7-13700H</td>
              <td>i7-1365U</td>
            </tr>
            <tr>
              <td><strong>RAM</strong></td>
              <td class="highlight">16GB Unified</td>
              <td>16GB DDR5</td>
              <td>16GB LPDDR5</td>
            </tr>
            <tr>
              <td><strong>Storage</strong></td>
              <td class="highlight">512GB SSD</td>
              <td>512GB SSD</td>
              <td>512GB SSD</td>
            </tr>
            <tr>
              <td><strong>Battery</strong></td>
              <td class="highlight">18 Hours</td>
              <td>12 Hours</td>
              <td>14 Hours</td>
            </tr>
            <tr>
              <td><strong>Weight</strong></td>
              <td>3.3 lbs</td>
              <td>4.2 lbs</td>
              <td class="highlight">2.48 lbs</td>
            </tr>
          </tbody>
        </table>

        <div style="margin-top: 12px; font-size: 11px; color: var(--text-secondary); line-height: 1.5; background: var(--bg-secondary); padding: 10px 12px; border-radius: var(--radius-sm); border: 1px solid var(--border-light);">
          ${shoppingData.aiRecommendation}
        </div>
      </div>

      <!-- Framer-Style Alternative Listings -->
      <div style="margin-top: 16px;">
        <div style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); margin-bottom: 10px;">
          Comparable Models
        </div>
        ${alts.map(alt => `
          <div class="framer-card" style="margin-bottom: 8px;">
            <div class="framer-icon-box" style="font-size: 14px; font-weight: 700; color: var(--text-secondary);">
              ${alt.store.includes('Dell') ? 'D' : 'L'}
            </div>
            <div class="framer-card-content">
              <div class="framer-card-title">${alt.title}</div>
              <div class="framer-card-desc">${alt.store} • ${alt.price} (${alt.tag})</div>
            </div>
            <div class="framer-card-action">
              <span>→</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}
