import React, { useState } from 'react';
import { Card, Chip } from '../components/Card';
import { Button } from '../components/Button';
import { ExternalLink, Bookmark, CheckCircle2, ShieldCheck, BellRing, Sparkles } from 'lucide-react';
import { mockShoppingComparison } from '../data/mock';

/**
 * Shopping Panel
 * Matches exact hackathon demonstration (TechBazaar MacBook Air M3 $1,299 listing):
 * - Active listing card with price, rating, specs, and Save/Track actions
 * - Hardware Comparison matrix (MacBook Air M3 vs Dell XPS 15 vs ThinkPad X1)
 * - Proactive analysis summary highlighting best battery and savings
 * - Multi-site verified deals with "Best price" & "Extended warranty" badges
 * - Autonomy safeguard: explicit user approval required for transactions
 */
export function ShoppingPanel({ onSaveProduct }) {
  const [data, setData] = useState(mockShoppingComparison);
  const [saved, setSaved] = useState(false);
  const [tracked, setTracked] = useState(false);

  const { currentProduct, hardwareComparison, sitesStatus, listings } = data;

  function handleSave() {
    setSaved(true);
    onSaveProduct && onSaveProduct(currentProduct);
  }

  function handleTrackPrice() {
    setTracked((prev) => !prev);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
      {/* 1. Active Product Header Card */}
      <Card variant="raised">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em'
              }}
            >
              Viewing
            </span>
            <Chip intent="shopping" size="sm">
              In Stock
            </Chip>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            {currentProduct.formattedPrice}
          </div>
        </div>

        <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px', lineHeight: 1.35 }}>
          {currentProduct.title}
        </h3>

        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          {currentProduct.site} · {currentProduct.rating}
        </div>

        <div
          style={{
            fontSize: '12px',
            color: 'var(--text-secondary)',
            backgroundColor: 'var(--bg-subtle)',
            padding: '8px 10px',
            borderRadius: 'var(--radius-xs)',
            marginBottom: '14px',
            lineHeight: 1.45
          }}
        >
          {currentProduct.specs}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            variant={saved ? 'secondary' : 'primary'}
            size="sm"
            style={{ flex: 1 }}
            icon={saved ? CheckCircle2 : Bookmark}
            onClick={handleSave}
          >
            {saved ? 'Saved in Vault' : 'Save Product'}
          </Button>

          <Button
            variant={tracked ? 'secondary' : 'ghost'}
            size="sm"
            icon={BellRing}
            onClick={handleTrackPrice}
          >
            {tracked ? 'Tracking Alert On' : 'Track Price'}
          </Button>
        </div>
      </Card>

      {/* 2. Hardware Comparison Matrix (from Demo Image 2) */}
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>
            Hardware Comparison
          </div>
          <span style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={12} /> Auto-synthesized
          </span>
        </div>

        <div style={{ overflowX: 'auto', margin: '0 -6px' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '11px',
              textAlign: 'left'
            }}
          >
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {hardwareComparison.headers.map((h, idx) => (
                  <th
                    key={h}
                    style={{
                      padding: '8px 6px',
                      color: idx === 1 ? 'var(--accent)' : 'var(--text-tertiary)',
                      fontWeight: 700,
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      backgroundColor: idx === 1 ? 'var(--accent-soft)' : 'transparent'
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hardwareComparison.rows.map((r) => (
                <tr key={r.spec} style={{ borderBottom: '1px solid var(--border-subtle, rgba(0,0,0,0.04))' }}>
                  <td style={{ padding: '7px 6px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                    {r.spec}
                  </td>
                  <td
                    style={{
                      padding: '7px 6px',
                      fontWeight: 600,
                      color: r.best === 'mac' ? 'var(--success)' : 'var(--text)',
                      backgroundColor: 'rgba(196, 98, 63, 0.04)'
                    }}
                  >
                    {r.mac}
                    {r.best === 'mac' && (
                      <span style={{ display: 'block', fontSize: '9px', color: 'var(--success)', fontWeight: 700 }}>
                        ★ Best
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '7px 6px', color: 'var(--text-secondary)' }}>
                    {r.dell}
                  </td>
                  <td
                    style={{
                      padding: '7px 6px',
                      color: r.best === 'thinkpad' ? 'var(--info)' : 'var(--text-secondary)',
                      fontWeight: r.best === 'thinkpad' ? 600 : 400
                    }}
                  >
                    {r.thinkpad}
                    {r.best === 'thinkpad' && (
                      <span style={{ display: 'block', fontSize: '9px', color: 'var(--info)', fontWeight: 600 }}>
                        ★ Lightest
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Proactive Analysis Note */}
        <div
          style={{
            marginTop: '12px',
            padding: '10px 12px',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-xs)',
            fontSize: '11px',
            color: 'var(--text)',
            lineHeight: 1.5,
            borderLeft: '3px solid var(--accent)'
          }}
        >
          <strong>Analysis:</strong> {hardwareComparison.analysis}
        </div>
      </Card>

      {/* 3. Multi-site Crawl Status */}
      <Card variant="subtle" style={{ padding: '12px 14px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-tertiary)', marginBottom: '8px', letterSpacing: '0.04em' }}>
          Cross-site search progress
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {sitesStatus.map((site) => (
            <div key={site.site} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--success)' }} />
                <span style={{ color: 'var(--text)', fontWeight: 500 }}>{site.site}</span>
              </div>
              <span style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>{site.time}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* 4. Comparable Models & Verified Listings */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-tertiary)', marginBottom: '10px' }}>
          Comparable Models & Retailers
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {listings.map((item) => (
            <Card
              key={item.site}
              style={{
                borderColor: item.isBestPrice ? 'rgba(95, 138, 91, 0.4)' : 'var(--border)',
                backgroundColor: item.isBestPrice ? 'var(--surface-raised)' : 'var(--surface)',
                padding: '12px 14px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>
                    {item.site}
                  </span>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                    Sold by {item.seller}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>
                    {item.formattedPrice}
                  </div>
                  {item.priceDiff && (
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: item.isBestPrice ? 'var(--success)' : 'var(--text-tertiary)'
                      }}
                    >
                      {item.priceDiff}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                {item.isBestPrice && (
                  <span
                    style={{
                      padding: '2px 7px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--success-soft)',
                      color: 'var(--success)',
                      fontSize: '11px',
                      fontWeight: 600
                    }}
                  >
                    Best Price
                  </span>
                )}
                {item.isBestSpec && (
                  <span
                    style={{
                      padding: '2px 7px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--info-soft)',
                      color: 'var(--info)',
                      fontSize: '11px',
                      fontWeight: 600
                    }}
                  >
                    Extended Warranty
                  </span>
                )}
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  {item.availability}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                  {item.specs}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  iconRight={ExternalLink}
                  onClick={() => window.open(item.link, '_blank')}
                >
                  View Listing
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 5. Safety Protocol Disclaimer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 12px',
          backgroundColor: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-sm)',
          fontSize: '11px',
          color: 'var(--text-secondary)'
        }}
      >
        <ShieldCheck size={16} color="var(--success)" style={{ flexShrink: 0 }} />
        <span>Browsify only compares prices and specifications. Purchases always happen directly by you.</span>
      </div>
    </div>
  );
}
