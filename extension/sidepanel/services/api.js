/**
 * Browsify - API Service Layer
 * Matches planned backend REST contracts:
 * - POST /api/events
 * - POST /api/intent
 * - GET /api/tasks
 * - POST /api/tasks
 * - POST /api/assistant/action
 * - GET /api/learning/progress
 * 
 * Returns rich mock data currently; can be switched to real backend URL with USE_MOCK_API = false.
 */

import {
  mockPageContexts,
  mockShoppingComparison,
  mockLearningData,
  mockResearchData,
  mockProductivityData,
  mockInitialTasks
} from '../data/mock.js';

export const API_CONFIG = {
  USE_MOCK_API: true,
  BACKEND_BASE_URL: 'http://localhost:8000/api'
};

export const api = {
  /**
   * POST /api/events
   * Receive browser activity events from content script / extension
   */
  async postEvent(eventPayload) {
    if (!API_CONFIG.USE_MOCK_API) {
      try {
        const res = await fetch(`${API_CONFIG.BACKEND_BASE_URL}/events`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(eventPayload)
        });
        return await res.json();
      } catch (err) {
        console.warn('Real backend unreachable, falling back to mock:', err);
      }
    }

    // Mock response
    return {
      status: 'success',
      eventId: 'evt_' + Date.now(),
      timestamp: Date.now()
    };
  },

  /**
   * POST /api/intent
   * Classify user intent from extracted context & session memory
   */
  async classifyIntent(liveContext, sessionHistory = []) {
    if (!API_CONFIG.USE_MOCK_API) {
      try {
        const res = await fetch(`${API_CONFIG.BACKEND_BASE_URL}/intent`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ liveContext, sessionHistory })
        });
        return await res.json();
      } catch (err) {
        console.warn('Real backend intent endpoint unreachable:', err);
      }
    }

    // Return mock intent based on liveContext or default to shopping
    const intentKey = (liveContext && liveContext.intent) || 'shopping';
    const mockCtx = mockPageContexts[intentKey] || mockPageContexts.shopping;
    
    return {
      intent: mockCtx.intent,
      confidence: mockCtx.confidence,
      suggestion: mockCtx.suggestion,
      taskId: mockCtx.taskId,
      reasoning: mockCtx.reasoning,
      extracted: mockCtx.extracted
    };
  },

  /**
   * GET /api/tasks
   * Retrieve current active & recent tasks
   */
  async getTasks() {
    if (!API_CONFIG.USE_MOCK_API) {
      try {
        const res = await fetch(`${API_CONFIG.BACKEND_BASE_URL}/tasks`);
        return await res.json();
      } catch (err) {
        console.warn('Backend tasks error:', err);
      }
    }
    return mockInitialTasks;
  },

  /**
   * POST /api/tasks
   * Create or update a task state
   */
  async updateTask(taskPayload) {
    if (!API_CONFIG.USE_MOCK_API) {
      try {
        const res = await fetch(`${API_CONFIG.BACKEND_BASE_URL}/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskPayload)
        });
        return await res.json();
      } catch (err) {
        console.warn('Backend update task error:', err);
      }
    }

    return {
      status: 'updated',
      task: {
        ...taskPayload,
        updatedAt: 'Just now'
      }
    };
  },

  /**
   * POST /api/assistant/action
   * Execute or record an approved action (e.g. compare, summarize, track)
   */
  async executeAction(actionType, payload = {}) {
    if (!API_CONFIG.USE_MOCK_API) {
      try {
        const res = await fetch(`${API_CONFIG.BACKEND_BASE_URL}/assistant/action`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ actionType, payload })
        });
        return await res.json();
      } catch (err) {
        console.warn('Backend action error:', err);
      }
    }

    return {
      status: 'executed',
      actionType,
      executedAt: Date.now(),
      undoAvailable: true,
      undoWindowSeconds: 8
    };
  },

  /**
   * GET /api/learning/progress
   * Retrieve learning curriculum progress, topics and revision items
   */
  async getLearningProgress(subject = 'Data Structures') {
    if (!API_CONFIG.USE_MOCK_API) {
      try {
        const res = await fetch(`${API_CONFIG.BACKEND_BASE_URL}/learning/progress?subject=${encodeURIComponent(subject)}`);
        return await res.json();
      } catch (err) {
        console.warn('Backend learning progress error:', err);
      }
    }

    return mockLearningData;
  },

  /**
   * Helper: Get shopping comparison matrix
   */
  async getShoppingComparison(productId = 'dell_xps_13') {
    return mockShoppingComparison;
  },

  /**
   * Helper: Get research article synthesis
   */
  async getResearchSynthesis(url) {
    return mockResearchData;
  },

  /**
   * Helper: Get productivity routine suggestions
   */
  async getProductivitySuggestions() {
    return mockProductivityData;
  }
};
