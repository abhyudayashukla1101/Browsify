/**
 * BrowserPilot - 4-Layer Context Memory Store
 * Manages:
 * Layer 1: Live Context (current active tab DOM & metadata)
 * Layer 2: Session Memory (rolling history of visited pages & dwell signals)
 * Layer 3: Long-Term Memory (saved items, completed curricula, preferences)
 * Layer 4: Task State (structured ongoing workflows that persist across tabs)
 */

export class MemoryStore {
  static async getMemoryState() {
    return new Promise((resolve) => {
      chrome.storage.local.get([
        'currentLiveContext',
        'sessionHistory',
        'savedItems',
        'activeTasks',
        'isPaused',
        'excludedDomains'
      ], (data) => {
        resolve({
          layer1_live: data.currentLiveContext || null,
          layer2_session: data.sessionHistory || [],
          layer3_longterm: data.savedItems || { shopping: [], education: [], research: [] },
          layer4_taskState: data.activeTasks || {},
          isPaused: !!data.isPaused,
          excludedDomains: data.excludedDomains || ['bank', 'paypal', 'login']
        });
      });
    });
  }

  static async updateTaskState(taskId, taskData) {
    return new Promise((resolve) => {
      chrome.storage.local.get(['activeTasks'], (res) => {
        const tasks = res.activeTasks || {};
        tasks[taskId] = {
          ...tasks[taskId],
          ...taskData,
          lastUpdated: Date.now()
        };
        chrome.storage.local.set({ activeTasks: tasks }, () => resolve(tasks[taskId]));
      });
    });
  }

  static async saveItem(category, item) {
    return new Promise((resolve) => {
      chrome.storage.local.get(['savedItems'], (res) => {
        const saved = res.savedItems || { shopping: [], education: [], research: [] };
        if (!saved[category]) saved[category] = [];
        
        // Check duplicate by url or title
        const exists = saved[category].some(x => x.id === item.id || (x.url && x.url === item.url));
        if (!exists) {
          saved[category].unshift({
            ...item,
            id: item.id || 'item_' + Date.now(),
            savedAt: Date.now()
          });
        }
        chrome.storage.local.set({ savedItems: saved }, () => resolve(saved[category]));
      });
    });
  }

  static async togglePause() {
    return new Promise((resolve) => {
      chrome.storage.local.get(['isPaused'], (res) => {
        const newState = !res.isPaused;
        chrome.storage.local.set({ isPaused: newState }, () => resolve(newState));
      });
    });
  }

  static async clearAllMemory() {
    return new Promise((resolve) => {
      chrome.storage.local.set({
        sessionHistory: [],
        activeTasks: {},
        savedItems: { shopping: [], education: [], research: [] },
        currentLiveContext: null
      }, () => resolve(true));
    });
  }
}
