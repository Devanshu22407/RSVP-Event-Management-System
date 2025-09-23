import axios from 'axios';
import { mockEvents, mockCommunities } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: async (userData) => {
    try {
      return await api.post('/auth/signup', userData);
    } catch (error) {
      console.warn('API not available, using mock response');
      return { 
        data: { 
          success: true, 
          token: 'mock-jwt-token',
          user: {
            id: 'new-user',
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email
          }
        } 
      };
    }
  },

  login: async (credentials) => {
    try {
      return await api.post('/auth/login', credentials);
    } catch (error) {
      console.warn('API not available, using mock response');
      if (credentials.email === 'demo@example.com' && credentials.password === 'demo123') {
        return { 
          data: { 
            success: true, 
            token: 'mock-jwt-token',
            user: {
              id: 'demo-user',
              firstName: 'Demo',
              lastName: 'User',
              email: 'demo@example.com'
            }
          } 
        };
      }
      throw new Error('Invalid credentials');
    }
  },

  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, newPassword) => api.post('/auth/reset-password', { token, newPassword }),
};

// Events API
export const eventsAPI = {
  getEvents: async (params) => {
    try {
      const response = await api.get('/events', { params });
      return response;
    } catch (error) {
      console.warn('API not available, using mock data');
      const filteredEvents = mockEvents.filter(event => {
        if (params?.category && event.category !== params.category) return false;
        if (params?.location && !event.location.city.toLowerCase().includes(params.location.toLowerCase())) return false;
        if (params?.search && !event.title.toLowerCase().includes(params.search.toLowerCase()) && 
            !event.description.toLowerCase().includes(params.search.toLowerCase())) return false;
        return true;
      });
      return { data: { success: true, events: filteredEvents } };
    }
  },

  getEvent: async (id) => {
    try {
      const response = await api.get(`/events/${id}`);
      return response;
    } catch (error) {
      console.warn('API not available, using mock data');
      const event = mockEvents.find(e => e._id === id);
      return { data: { success: true, event } };
    }
  },

  createEvent: (eventData) => api.post('/events', eventData),
  updateEvent: (id, eventData) => api.put(`/events/${id}`, eventData),
  deleteEvent: (id) => api.delete(`/events/${id}`),
  getMyEvents: (params) => api.get('/events/my/created', { params }),
};

// RSVP API
export const rsvpAPI = {
  createRSVP: (eventId, rsvpData) => api.post(`/rsvps/events/${eventId}`, rsvpData),
  getUserRSVPs: (params) => api.get('/rsvps/my', { params }),
  getUserEventRSVP: (eventId) => api.get(`/rsvps/events/${eventId}`),
  getEventRSVPs: (eventId, params) => api.get(`/rsvps/events/${eventId}/all`, { params }),
  deleteRSVP: (eventId) => api.delete(`/rsvps/events/${eventId}`),
};

// Comments API
export const commentsAPI = {
  getEventComments: (eventId, params) => api.get(`/comments/events/${eventId}`, { params }),
  createComment: (eventId, commentData) => api.post(`/comments/events/${eventId}`, commentData),
  updateComment: (commentId, commentData) => api.put(`/comments/${commentId}`, commentData),
  deleteComment: (commentId) => api.delete(`/comments/${commentId}`),
  toggleLike: (commentId) => api.post(`/comments/${commentId}/like`),
  getUserComments: (params) => api.get('/comments/my', { params }),
};

// Users API
export const usersAPI = {
  getProfile: (userId) => userId ? api.get(`/users/${userId}`) : api.get('/users/me'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  changePassword: (passwordData) => api.put('/users/password', passwordData),
  updateEmail: (emailData) => api.put('/users/email', emailData),
  deleteAccount: (data) => api.delete('/users/account', { data }),
  getDashboard: () => api.get('/users/dashboard'),
  searchUsers: (params) => api.get('/users/search', { params }),
};

// Admin API
export const adminAPI = {
  login: (credentials) => api.post('/admin/api/login', credentials),
  getDashboardStats: () => api.get('/admin/api/dashboard/stats'),
  getRecentActivity: (params) => api.get('/admin/api/dashboard/activity', { params }),
  getAllUsers: (params) => api.get('/admin/api/users', { params }),
  getAllEvents: (params) => api.get('/admin/api/events', { params }),
  deleteUser: (userId) => api.delete(`/admin/api/users/${userId}`),
  deleteEvent: (eventId) => api.delete(`/admin/api/events/${eventId}`),
  toggleUserStatus: (userId) => api.patch(`/admin/api/users/${userId}/status`),
};

// Communities API
export const communitiesAPI = {
  getCommunities: async (params = {}) => {
    try {
      // API call would go here when backend is ready
      console.warn('Communities API not implemented, using mock data');
      const filteredCommunities = mockCommunities.filter(community => {
        if (params.category && community.category !== params.category) return false;
        if (params.location && !community.location.toLowerCase().includes(params.location.toLowerCase())) return false;
        return true;
      });
      return { data: { success: true, communities: filteredCommunities } };
    } catch (error) {
      console.warn('API not available, using mock data');
      return { data: { success: true, communities: mockCommunities } };
    }
  },

  joinCommunity: async (communityId) => {
    try {
      // API call would go here when backend is ready
      console.warn('Join community API not implemented, using mock response');
      return { data: { success: true, message: 'Successfully joined community!' } };
    } catch (error) {
      return { data: { success: true, message: 'Successfully joined community!' } };
    }
  },

  leaveCommunity: async (communityId) => {
    try {
      // API call would go here when backend is ready
      console.warn('Leave community API not implemented, using mock response');
      return { data: { success: true, message: 'Successfully left community!' } };
    } catch (error) {
      return { data: { success: true, message: 'Successfully left community!' } };
    }
  },
};

export default api;