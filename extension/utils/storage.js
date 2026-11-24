/**
 * Browsify - Storage Utility
 * Wraps chrome.storage.local with a safe fallback to localStorage for normal browser preview.
 */

const hasChromeStorage = typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local;

export const storage = {
  async get(keys) {
    if (hasChromeStorage) {
      return new Promise((resolve) => {
        chrome.storage.local.get(keys, (result) => {
          resolve(result || {});
        });
      });
    }

    // localStorage fallback
    const result = {};
    const keyList = Array.isArray(keys) ? keys : typeof keys === 'string' ? [keys] : Object.keys(keys || {});
    
    keyList.forEach((k) => {
      try {
        const raw = localStorage.getItem(`browsify_${k}`);
        if (raw !== null) {
          result[k] = JSON.parse(raw);
        } else if (typeof keys === 'object' && !Array.isArray(keys) && keys[k] !== undefined) {
          result[k] = keys[k];
        }
      } catch {
        result[k] = null;
      }
    });

    return result;
  },

  async set(items) {
    if (hasChromeStorage) {
      return new Promise((resolve) => {
        chrome.storage.local.set(items, () => {
          resolve(true);
        });
      });
    }

    // localStorage fallback
    Object.entries(items).forEach(([k, v]) => {
      try {
        localStorage.setItem(`browsify_${k}`, JSON.stringify(v));
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }
    });
    return true;
  },

  async remove(keys) {
    if (hasChromeStorage) {
      return new Promise((resolve) => {
        chrome.storage.local.remove(keys, () => resolve(true));
      });
    }

    const keyList = Array.isArray(keys) ? keys : [keys];
    keyList.forEach((k) => {
      localStorage.removeItem(`browsify_${k}`);
    });
    return true;
  },

  async clear() {
    if (hasChromeStorage) {
      return new Promise((resolve) => {
        chrome.storage.local.clear(() => resolve(true));
      });
    }

    Object.keys(localStorage).forEach((k) => {
      if (k.startsWith('browsify_')) {
        localStorage.removeItem(k);
      }
    });
    return true;
  }
};
