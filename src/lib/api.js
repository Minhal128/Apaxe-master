import axios from 'axios';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('master_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('master_token');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// ============ AUTHENTICATION ============

export const authApi = {
  login: (credentials) =>
    api.post('/auth/login', credentials),

  logout: () =>
    api.post('/auth/logout'),

  getProfile: () =>
    api.get('/auth/profile'),
};

// ============ DASHBOARD & MARKET DATA ============

export const dashboardApi = {
  getDashboard: () =>
    api.get('/master/dashboard'),

  getMarketData: (params = {}) =>
    api.get('/instruments', { params }),

  // Get real-time market data from Redis
  getMarketWatch: (segment, params = {}) =>
    api.get(`/market/segment/${segment}`, { params }),
};

// ============ CLIENT MANAGEMENT ============

export const clientApi = {
  getClients: (params = {}) =>
    api.get('/master/clients', { params }),

  createClient: (clientData) =>
    api.post('/master/clients', clientData),

  updateClient: (id, updateData) =>
    api.put(`/master/clients/${id}`, updateData),

  adjustClientBalance: (id, data) =>
    api.post(`/master/clients/${id}/balance`, data),
};

// ============ USER MANAGEMENT (same as admin) ============

export const userApi = {
  getUsers: (params = {}) =>
    api.get('/users', { params }),

  getUser: (id) =>
    api.get(`/users/${id}`),

  createUser: (userData) =>
    api.post('/users', userData),

  updateUser: (id, updateData) =>
    api.put(`/users/${id}`, updateData),

  adjustBalance: (id, data) =>
    api.post(`/users/${id}/balance`, data),

  resetPassword: (id, newPassword) =>
    api.post(`/users/${id}/reset-password`, { newPassword }),
};

// ============ TRADING MANAGEMENT ============

export const tradingApi = {
  getClientTrades: (params = {}) =>
    api.get('/master/trades', { params }),

  getClientPositions: (params = {}) =>
    api.get('/master/positions', { params }),

  // Trading Rules
  getTradingRules: () =>
    api.get('/master/trading-rules'),

  updateTradingRules: (data) =>
    api.put('/master/trading-rules', data),
};

// ============ REPORTS ============

export const reportsApi = {
  getPnLReport: (params = {}) =>
    api.get('/master/reports/pnl', { params }),

  getCommissionReport: (params = {}) =>
    api.get('/master/reports/commission', { params }),

  getLedgerReport: (params = {}) =>
    api.get('/master/reports/ledger', { params }),

  getExposureReport: (params = {}) =>
    api.get('/master/reports/exposure', { params }),

  getReportStats: () =>
    api.get('/master/reports/stats'),
};

// ============ SETTINGS API ============
export const settingsApi = {
  getSettings: () =>
    api.get('/master/settings'),

  updateSettings: (category, settings) =>
    api.put('/master/settings', { category, settings }),
};

// ============ FUNDS MANAGEMENT ============

export const fundsApi = {
  getFundsOverview: (params = {}) =>
    api.get('/master/funds', { params }),
};

// ============ NOTIFICATIONS ============

export const notificationApi = {
  // Get user's notifications
  getNotifications: (params = {}) =>
    api.get('/notifications', { params }),

  // Get unread count
  getUnreadCount: () =>
    api.get('/notifications/unread-count'),

  // Mark all as read
  markAllAsRead: () =>
    api.post('/notifications/read-all'),

  // Mark single notification as read
  markAsRead: (id) =>
    api.post(`/notifications/${id}/read`),

  // Delete notification
  deleteNotification: (id) =>
    api.delete(`/notifications/${id}`),

  // Admin: Get all announcements
  getAnnouncements: (params = {}) =>
    api.get('/notifications/admin/announcements', { params }),

  // Admin: Get notification stats
  getNotificationStats: () =>
    api.get('/notifications/admin/stats'),

  // Admin: Send notification to user
  sendToUser: (data) =>
    api.post('/notifications/admin/send-to-user', data),

  // Admin/Master: Send announcement
  sendAnnouncement: (data) =>
    api.post('/notifications/admin/announcement', data),

  // Admin: Get user's notifications
  getUserNotifications: (userId, params = {}) =>
    api.get(`/notifications/admin/user/${userId}`, { params }),
};

export default api;