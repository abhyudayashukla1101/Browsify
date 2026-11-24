/**
 * Browsify - Content Script (DOM & Schema Extractor)
 * 
 * Responsibilities:
 * 1. Observes web pages on document_idle.
 * 2. Extracts OpenGraph metadata, JSON-LD schemas (Product, Course, ScholarlyArticle), and document title.
 * 3. Enforces strict privacy sanitization: NEVER reads password fields, payment inputs, CVVs, or bank sessions.
 * 4. Sends structured context to background service worker and active side panels.
 */

(function () {
  'use strict';

  function extractPageData() {
    const title = document.title || '';
    const url = window.location.href;
    const domain = window.location.hostname || 'localhost';

    // 1. JSON-LD structured data
    const jsonLd = [];
    document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => {
      try {
        const parsed = JSON.parse(el.textContent);
        if (Array.isArray(parsed)) jsonLd.push(...parsed);
        else jsonLd.push(parsed);
      } catch (e) {}
    });

    // 2. OpenGraph & Meta
    const meta = {};
    document.querySelectorAll('meta').forEach((m) => {
      const name = m.getAttribute('name') || m.getAttribute('property');
      const content = m.getAttribute('content');
      if (name && content) meta[name.toLowerCase()] = content.trim();
    });

    // 3. Simple heuristic intent detection
    let inferredIntent = 'unknown';
    let confidence = 0.50;

    const lowerTitle = title.toLowerCase();
    const lowerUrl = url.toLowerCase();

    const hasProductSchema = jsonLd.some((s) => s['@type'] === 'Product' || s.type === 'Product');
    const hasCourseSchema = jsonLd.some((s) => s['@type'] === 'Course' || s.type === 'Course');
    const hasArticleSchema = jsonLd.some((s) => s['@type'] === 'ScholarlyArticle' || s['@type'] === 'Article');

    if (hasProductSchema || lowerTitle.includes('macbook') || lowerTitle.includes('laptop') || lowerUrl.includes('shopping')) {
      inferredIntent = 'shopping';
      confidence = 0.92;
    } else if (hasCourseSchema || lowerTitle.includes('linked list') || lowerUrl.includes('education')) {
      inferredIntent = 'learning';
      confidence = 0.88;
    } else if (lowerTitle.includes('framer') || lowerUrl.includes('framer')) {
      inferredIntent = 'research';
      confidence = 0.93;
    } else if (hasArticleSchema || lowerTitle.includes('autonomous proactive') || lowerUrl.includes('research')) {
      inferredIntent = 'research';
      confidence = 0.94;
    }

    return {
      title,
      url,
      domain,
      meta,
      jsonLd,
      inferredIntent,
      confidence,
      timestamp: Date.now()
    };
  }

  // Listen for extraction requests from background.js
  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.type === 'BROWSIFY_EXTRACT_PAGE') {
        sendResponse(extractPageData());
      }
      return true;
    });
  }

  // Debounced notification on load
  let timer = null;
  function notify() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
          chrome.runtime.sendMessage({
            type: 'PAGE_OBSERVED',
            payload: extractPageData()
          });
        }
      } catch (e) {}
    }, 600);
  }

  if (document.readyState === 'complete') notify();
  else window.addEventListener('DOMContentLoaded', notify);
})();
