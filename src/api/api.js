import axios from 'axios';

// Use import.meta.env instead of process.env for Vite
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

console.log('🔧 API Base URL:', API_BASE_URL); // Add this line

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('❌ API Error:', error.message); // Add this line
    if (error.response) {
      throw {
        message: error.response.data.message || 'An error occurred',
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      throw {
        message: 'No response from server. Please check your connection.',
        status: 503,
      };
    } else {
      throw {
        message: error.message || 'Request failed',
        status: 500,
      };
    }
  }
);

// Product API calls
export const productApi = {
  getProducts: async (params = {}) => {
    const { category, limit = 20, cursorCreatedAt, cursorId } = params;
    
    const queryParams = new URLSearchParams();
    if (category) queryParams.append('category', category);
    if (limit) queryParams.append('limit', limit);
    if (cursorCreatedAt) queryParams.append('cursorCreatedAt', cursorCreatedAt);
    if (cursorId) queryParams.append('cursorId', cursorId);
    
    const queryString = queryParams.toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
    
    console.log('📡 Fetching:', endpoint); // Add this line
    return api.get(endpoint);
  },

  getCategories: async () => {
    console.log('📡 Fetching categories'); // Add this line
    return api.get('/categories');
  },
};

export default api;