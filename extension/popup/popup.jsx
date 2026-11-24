import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Compass, Pause, Play, ExternalLink, ShieldOff } from 'lucide-react';
import { StatusPill } from '../sidepanel/components/StatusPill';
import { Chip } from '../sidepanel/components/Card';
import { Toggle } from '../sidepanel/components/Toggle';
import { storage } from '../utils/storage';
import './popup.css';

function PopupApp() {
  const [isPaused, setIsPaused] = useState(false);
  const [isExcluded, setIsExcluded] = useState(false);
  const [currentDomain, setCurrentDomain] = useState('amazon.in');
  const [intent, setIntent] = useState('shopping');

  useEffect(() => {
    async function init() {
      const data = await storage.get(['isPaused', 'excludedDomains']);
      if (data.isPaused !== undefined) setIsPaused(data.isPaused);
      
      // Query active tab domain if in extension
      if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs && tabs[0] && tabs[0].url) {
            try {
              const url = new URL(tabs[0].url);
              setCurrentDomain(url.hostname);
              const excluded = data.excludedDomains || [];
              setIsExcluded(excluded.includes(url.hostname));
            } catch (e) {}
          }
        });
      }
    }
    init();
  }, []);

  function handleTogglePause() {
    const next = !isPaused;
    setIsPaused(next);
    storage.set({ isPaused: next });
  }

  function handleToggleExclude(checked) {
    setIsExcluded(checked);
    storage.get(['excludedDomains']).then((data) => {
      const list = data.excludedDomains || [];
      const updated = checked
        ? [...list, currentDomain]
        : list.filter((d) => d !== currentDomain);
      storage.set({ excludedDomains: updated });
    });
  }

  function handleOpenSidepanel() {
    if (typeof chrome !== 'undefined' && chrome.sidePanel && chrome.sidePanel.open) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs && tabs[0]) {
          chrome.sidePanel.open({ tabId: tabs[0].id }).catch(() => {});
          window.close();
        }
      });
    } else {
      window.open('/extension/sidepanel/index.html', '_blank');
    }
  }

  return (
    <div className="popup-container">
      {/* Header */}
      <div className="popup-header">
        <div className="popup-brand">
          <div className="popup-logo">
            <Compass size={15} />
          </div>
          <span className="popup-title">Browsify</span>
        </div>
        <StatusPill status={isPaused ? 'Paused' : 'Observing'} />
      </div>

      {/* Active Domain & Intent Card */}
      <div className="popup-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
            Active Tab
          </span>
          <Chip intent={intent} size="sm">
            Shopping · 91%
          </Chip>
        </div>
        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {currentDomain}
        </div>
      </div>

      {/* Big Pause/Resume Button */}
      <button
        type="button"
        className={`popup-btn ${isPaused ? 'popup-btn-primary' : 'popup-btn-secondary'}`}
        onClick={handleTogglePause}
      >
        {isPaused ? <Play size={15} /> : <Pause size={15} />}
        <span>{isPaused ? 'Resume Browsify' : 'Pause observation'}</span>
      </button>

      {/* Exclude this site toggle */}
      <div className="popup-card" style={{ padding: '10px 12px' }}>
        <Toggle
          checked={isExcluded}
          onChange={handleToggleExclude}
          label="Exclude this website"
          description="Never analyze or remember context here"
        />
      </div>

      {/* Open Sidepanel Button */}
      <button
        type="button"
        className="popup-btn popup-btn-primary"
        onClick={handleOpenSidepanel}
      >
        <ExternalLink size={14} />
        <span>Open Browsify panel</span>
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('popup-root')).render(
  <React.StrictMode>
    <PopupApp />
  </React.StrictMode>
);
