/**
 * Browsify - Messaging Utility
 * Wraps chrome.runtime messaging with safe event listener fallback for browser tab preview.
 */

const hasChromeRuntime = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage;

// In-memory fallback listener registry for dev mode
const devListeners = new Set();

export const messaging = {
  sendMessage(message) {
    if (hasChromeRuntime) {
      return new Promise((resolve) => {
        try {
          chrome.runtime.sendMessage(message, (response) => {
            if (chrome.runtime.lastError) {
              resolve(null);
            } else {
              resolve(response);
            }
          });
        } catch {
          resolve(null);
        }
      });
    }

    // Dev mode in-memory broadcast
    devListeners.forEach((listener) => {
      try {
        listener(message, {}, () => {});
      } catch (err) {
        console.warn('Dev message listener error:', err);
      }
    });
    return Promise.resolve({ ok: true, devMode: true });
  },

  onMessage(callback) {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
      chrome.runtime.onMessage.addListener(callback);
      return () => {
        chrome.runtime.onMessage.removeListener(callback);
      };
    }

    // Dev fallback
    devListeners.add(callback);
    return () => {
      devListeners.delete(callback);
    };
  }
};
