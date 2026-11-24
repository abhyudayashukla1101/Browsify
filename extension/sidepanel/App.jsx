import React, { useState, useEffect } from 'react';
import './styles/tokens.css';
import './styles/global.css';

// Components
import { Header } from './components/Header';
import { PageStrip } from './components/PageStrip';
import { Tabs } from './components/Tabs';
import { BottomComposer } from './components/BottomComposer';
import { Toast } from './components/Toast';
import { DemoControls } from './components/DemoControls';
import { Styleguide } from './components/Styleguide';

// Views
import { OnboardingView } from './views/OnboardingView';
import { ActivityView } from './views/ActivityView';
import { SuggestionsView } from './views/SuggestionsView';
import { ShoppingPanel } from './views/ShoppingPanel';
import { LearningPanel } from './views/LearningPanel';
import { ResearchPanel } from './views/ResearchPanel';
import { ProductivityPanel } from './views/ProductivityPanel';
import { MemoryView } from './views/MemoryView';
import { SettingsView } from './views/SettingsView';

// Mock Data & Storage
import { mockPageContexts, mockTimeline } from './data/mock';
import { storage } from '../utils/storage';

// Icons for Tab bar
import { Activity, Lightbulb, Compass, Database } from 'lucide-react';

export default function App() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState('progress'); // Default to progress so demo shows immediately
  const [progressSubView, setProgressSubView] = useState('shopping'); // shopping | learning | research | productivity
  const [researchMode, setResearchMode] = useState('paper'); // paper | framermcp
  const [hasOnboarded, setHasOnboarded] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Active Context & Simulation
  const [currentScenario, setCurrentScenario] = useState('shopping');
  const [pageContext, setPageContext] = useState(mockPageContexts.shopping);
  const [timeline, setTimeline] = useState(mockTimeline);

  // Check URL hash for #styleguide, stored onboarding, and live Chrome tabs
  useEffect(() => {
    if (window.location.hash === '#styleguide' || window.location.search.includes('view=styleguide')) {
      setActiveTab('styleguide');
    }

    async function loadStoredState() {
      const data = await storage.get(['hasOnboarded', 'isPaused']);
      if (data.hasOnboarded !== undefined) {
        setHasOnboarded(data.hasOnboarded);
      }
      if (data.isPaused !== undefined) {
        setIsPaused(data.isPaused);
      }
    }
    loadStoredState();

    // Live Chrome Extension Active Tab Observation
    if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
      function detectActiveTab() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (!tabs || !tabs[0]) return;
          const active = tabs[0];
          const url = (active.url || '').toLowerCase();
          const title = (active.title || '').toLowerCase();

          if (url.includes('shopping') || url.includes('laptop') || title.includes('macbook') || title.includes('techbazaar')) {
            handleSelectScenario('shopping');
          } else if (url.includes('education') || url.includes('linked-list') || title.includes('linked list')) {
            handleSelectScenario('learning');
          } else if (url.includes('framer') || title.includes('framer') || title.includes('mcp')) {
            handleSelectScenario('framermcp');
          } else if (url.includes('research') || url.includes('ai-agent') || title.includes('autonomous proactive')) {
            handleSelectScenario('research');
          }
        });
      }

      // Query on mount
      detectActiveTab();

      // Listen for tab activation changes
      if (chrome.tabs.onActivated) {
        chrome.tabs.onActivated.addListener(detectActiveTab);
      }
    }
  }, []);

  // Update Page Context on Scenario Change
  function handleSelectScenario(scenarioKey) {
    setCurrentScenario(scenarioKey);

    if (scenarioKey === 'memory') {
      setActiveTab('memory');
      return;
    }

    const ctx = mockPageContexts[scenarioKey] || mockPageContexts.shopping;
    setPageContext(ctx);

    // Auto-align views
    setActiveTab('progress');
    if (scenarioKey === 'shopping') {
      setProgressSubView('shopping');
    } else if (scenarioKey === 'learning') {
      setProgressSubView('learning');
    } else if (scenarioKey === 'research') {
      setProgressSubView('research');
      setResearchMode('paper');
    } else if (scenarioKey === 'framermcp') {
      setProgressSubView('research');
      setResearchMode('framermcp');
    }

    // Auto-executed safe task notification if confidence is high
    if (ctx.confidence >= 0.85) {
      setToastMessage(`Proactively analyzed ${ctx.domain}.`);
    }
  }

  function handleChangeConfidence(newConfidence) {
    setPageContext((prev) => {
      const updated = { ...prev, confidence: newConfidence };
      if (newConfidence >= 0.85) {
        setToastMessage(`Confidence reached ${Math.round(newConfidence * 100)}%: auto-performed task.`);
      }
      return updated;
    });
  }

  function handleResetDemo() {
    handleSelectScenario('shopping');
    setActiveTab('progress');
    setIsPaused(false);
    setToastMessage(null);
  }

  function handleTogglePause() {
    setIsPaused((prev) => {
      const next = !prev;
      storage.set({ isPaused: next });
      return next;
    });
  }

  function handleOnboardingComplete(prefs) {
    setHasOnboarded(true);
    storage.set({ hasOnboarded: true, ...prefs });
  }

  function handleCorrectIntent(newIntent) {
    handleSelectScenario(newIntent);
    setToastMessage(`Intent corrected to ${newIntent}.`);
  }

  // Calculate Suggestions count badge
  const suggestionsCount = pageContext.confidence >= 0.60 && pageContext.suggestion ? 1 : 0;

  // Segmented Tabs config
  const tabs = [
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'progress', label: 'Assist', icon: Compass },
    { id: 'suggestions', label: 'Suggestions', icon: Lightbulb, badge: suggestionsCount },
    { id: 'memory', label: 'Memory', icon: Database }
  ];

  // If user has not onboarded yet
  if (!hasOnboarded) {
    return (
      <div style={{ height: '100%', overflowY: 'auto' }}>
        <OnboardingView onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  // If user requested Styleguide
  if (activeTab === 'styleguide') {
    return <Styleguide onBack={() => setActiveTab('progress')} />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      {/* 1. Sticky Header with 1-Click Demo Bar */}
      <Header
        status={isPaused ? 'Paused' : pageContext.confidence >= 0.85 ? 'Acting' : pageContext.confidence >= 0.60 ? 'Suggesting' : 'Observing'}
        isPaused={isPaused}
        onTogglePause={handleTogglePause}
        onOpenSettings={() => setActiveTab(activeTab === 'settings' ? 'progress' : 'settings')}
        currentScenario={currentScenario}
        onSelectScenario={handleSelectScenario}
      />

      {/* 2. Current Page Strip */}
      <PageStrip
        pageContext={pageContext}
        onCorrectIntent={handleCorrectIntent}
      />

      {/* 3. Segmented Tab Bar (Hidden in Settings view) */}
      {activeTab !== 'settings' && (
        <div style={{ padding: '8px 16px', backgroundColor: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={(tabId) => setActiveTab(tabId)}
          />
        </div>
      )}

      {/* 4. Active View Content Area (Scrollable) */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 24px' }}>
        {activeTab === 'settings' && (
          <SettingsView onClearData={() => setToastMessage('All browsing context cleared.')} />
        )}

        {activeTab === 'activity' && (
          <ActivityView
            pageContext={pageContext}
            timeline={timeline}
            onOpenCorrection={() => {}}
            onAcceptSuggestion={() => {
              setActiveTab('progress');
              setToastMessage('Suggestion accepted.');
            }}
            onDismissSuggestion={() => {
              setToastMessage('Suggestion dismissed.');
            }}
            onUndoAutoAction={() => {
              setToastMessage('Action undone.');
            }}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'suggestions' && (
          <SuggestionsView
            onExecuteAction={(sugg) => {
              if (sugg.targetTab) {
                setActiveTab('progress');
                setProgressSubView(sugg.targetTab);
              }
              setToastMessage(`Executed: ${sugg.title}`);
            }}
            onDismissAction={() => setToastMessage('Suggestion postponed.')}
            onExcludeSite={() => setToastMessage(`Excluded suggestions for ${pageContext.domain}.`)}
          />
        )}

        {activeTab === 'progress' && (
          <div>
            {/* Sub-selector for the 4 Specialised Handlers */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', overflowX: 'auto', paddingBottom: '2px' }}>
              {[
                { id: 'shopping', label: '🛒 Shopping' },
                { id: 'learning', label: '🎓 Education' },
                { id: 'research', label: '🔬 Research' },
                { id: 'productivity', label: '⚡ Productivity' }
              ].map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setProgressSubView(sub.id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid',
                    borderColor: progressSubView === sub.id ? 'var(--accent)' : 'var(--border)',
                    backgroundColor: progressSubView === sub.id ? 'var(--accent-soft)' : 'var(--surface)',
                    color: progressSubView === sub.id ? 'var(--accent)' : 'var(--text-secondary)',
                    fontSize: '11px',
                    fontWeight: progressSubView === sub.id ? 600 : 400,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {progressSubView === 'shopping' && <ShoppingPanel onSaveProduct={() => setToastMessage('MacBook Air saved to your vault.')} />}
            {progressSubView === 'learning' && <LearningPanel />}
            {progressSubView === 'research' && <ResearchPanel initialMode={researchMode} />}
            {progressSubView === 'productivity' && <ProductivityPanel />}
          </div>
        )}

        {activeTab === 'memory' && (
          <MemoryView
            onResumeTask={(task) => {
              if (task.intent === 'shopping') {
                setActiveTab('progress');
                setProgressSubView('shopping');
              } else if (task.intent === 'learning') {
                setActiveTab('progress');
                setProgressSubView('learning');
              }
              setToastMessage(`Resumed task: ${task.title}`);
            }}
            onClearMemory={() => setToastMessage('Browsing context cleared.')}
          />
        )}
      </main>

      {/* 5. Bottom Composer (Secondary) */}
      <BottomComposer onSendMessage={(msg) => setToastMessage(`Browsify noted: "${msg}"`)} />

      {/* 6. Toast Notification with 8-second Undo */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onUndo={() => {
            setToastMessage(null);
            alert('Action reversed successfully.');
          }}
          onDismiss={() => setToastMessage(null)}
        />
      )}

      {/* 7. Dev Demo Controls Drawer (Bottom corner) */}
      <DemoControls
        currentScenario={currentScenario}
        onSelectScenario={handleSelectScenario}
        currentConfidence={pageContext.confidence}
        onChangeConfidence={handleChangeConfidence}
        onReset={handleResetDemo}
      />
    </div>
  );
}
