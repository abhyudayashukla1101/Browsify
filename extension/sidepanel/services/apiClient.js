/**
 * BrowserPilot - API Client Service
 * Bridges the Extension Sidepanel with either the local Central Intelligence Engine
 * or the Python FastAPI backend (at http://localhost:8000/api).
 * 
 * To switch to the real backend later, simply set USE_REAL_BACKEND = true.
 */

export const API_CONFIG = {
  USE_REAL_BACKEND: false,
  BACKEND_BASE_URL: 'http://localhost:8000/api'
};

export class ApiClient {
  static async postEvent(eventPayload) {
    if (API_CONFIG.USE_REAL_BACKEND) {
      try {
        const res = await fetch(`${API_CONFIG.BACKEND_BASE_URL}/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventPayload)
        });
        return await res.json();
      } catch (err) {
        console.warn('Real backend unreachable, falling back to local engine:', err);
      }
    }
    // Handled by local agentEngine
    return { status: 'recorded_locally' };
  }

  static async classifyIntent(liveContext, sessionHistory) {
    if (API_CONFIG.USE_REAL_BACKEND) {
      try {
        const res = await fetch(`${API_CONFIG.BACKEND_BASE_URL}/intent`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ liveContext, sessionHistory })
        });
        return await res.json();
      } catch (err) {
        console.warn('Backend intent error, using local engine fallback:', err);
      }
    }
    return null; // Signals caller to use agentEngine
  }

  static async getTasks() {
    if (API_CONFIG.USE_REAL_BACKEND) {
      try {
        const res = await fetch(`${API_CONFIG.BACKEND_BASE_URL}/tasks`);
        return await res.json();
      } catch (e) {
        console.warn(e);
      }
    }
    return null;
  }
}
