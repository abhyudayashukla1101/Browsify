/**
 * Browsify - Background Service Worker (Manifest V3)
 * 
 * Coordinates:
 * 1. Tab changes and updates.
 * 2. Broadcasts extracted context to chrome.storage.local and active side panels.
 * 3. Handles side panel behavior.
 */

// Configure side panel behavior
chrome.runtime.onInstalled.addListener(() => {
  if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {});
  }

  // Initialize storage defaults
  chrome.storage.local.get(['isPaused', 'hasOnboarded', 'excludedDomains'], (data) => {
    const defaults = {};
    if (data.isPaused === undefined) defaults.isPaused = false;
    if (data.hasOnboarded === undefined) defaults.hasOnboarded = false;
    if (!data.excludedDomains) {
      defaults.excludedDomains = ['onlinesbi.sbi', 'hdfcbank.com', 'paypal.com', 'mail.google.com'];
    }
    chrome.storage.local.set(defaults);
  });

  console.log('[Browsify Background] Service Worker installed.');
});

// Broadcast live context on tab update
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('chrome://')) {
    chrome.tabs.sendMessage(tabId, { type: 'BROWSIFY_EXTRACT_PAGE' }, (response) => {
      if (chrome.runtime.lastError || !response) return;
      chrome.storage.local.set({ currentLiveContext: response });
    });
  }
});

// Broadcast on tab switch
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.sendMessage(activeInfo.tabId, { type: 'BROWSIFY_EXTRACT_PAGE' }, (response) => {
    if (chrome.runtime.lastError || !response) return;
    chrome.storage.local.set({ currentLiveContext: response });
  });
});

// Message listener for popup & content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'PAGE_OBSERVED' && message.payload) {
    chrome.storage.local.set({ currentLiveContext: message.payload });
    sendResponse({ ok: true });
  } else if (message.type === 'OPEN_SIDEPANEL') {
    if (chrome.sidePanel && sender.tab) {
      chrome.sidePanel.open({ tabId: sender.tab.id }).catch(console.error);
    }
    sendResponse({ ok: true });
  }
  return true;
});
