/**
 * VernacularAI Reusable API Client
 * Configured with VITE_API_BASE_URL, JWT token injection, and unified error handling
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export async function request(endpoint, options = {}) {
  // Normalize URL
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${cleanEndpoint}`;

  // Get token from localStorage
  const token = localStorage.getItem('vernacular_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const config = {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined
  };

  try {
    const response = await fetch(url, config);
    let data = null;

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { message: text };
    }

    if (!response.ok) {
      // If 401 Unauthorized, notify or clear session if token expired
      if (response.status === 401) {
        if (token) {
          localStorage.removeItem('vernacular_token');
          // Dispatch custom event for app-wide reactive session reset
          window.dispatchEvent(new CustomEvent('vernacular:auth-expired'));
        }
      }

      const errorMessage = data?.message || data?.error || `Request failed with status ${response.status}`;
      throw new ApiError(errorMessage, response.status, data);
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Network or abort errors
    throw new ApiError(
      error.message === 'Failed to fetch'
        ? 'Cannot connect to VernacularAI server. Please verify the backend is running.'
        : error.message || 'An unexpected network error occurred.',
      0,
      null
    );
  }
}

export const api = {
  get: (url, options) => request(url, { ...options, method: 'GET' }),
  post: (url, body, options) => request(url, { ...options, method: 'POST', body }),
  put: (url, body, options) => request(url, { ...options, method: 'PUT', body }),
  delete: (url, options) => request(url, { ...options, method: 'DELETE' })
};

export default api;
