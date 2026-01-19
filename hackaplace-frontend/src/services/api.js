import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Add Firebase token to requests
api.interceptors.request.use(async (config) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  } catch (error) {
    console.error('Error setting auth header:', error);
  }
  return config;
});

// Auth API
export const authAPI = {
  login: async (firebaseToken) => {
    const response = await api.post('/auth/login', { token: firebaseToken });
    return response.data;
  },

  verifyToken: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  }
};

// Hackathons API
export const hackathonsAPI = {
  getAll: async () => {
    const response = await api.get('/hackathons');
    return response.data.hackathons;
  },

  getById: async (id) => {
    const response = await api.get(`/hackathons/${id}`);
    return response.data.hackathon;
  },

  create: async (hackathonData) => {
    const response = await api.post('/hackathons', hackathonData);
    return response.data.hackathon;
  },

  update: async (id, hackathonData) => {
    const response = await api.put(`/hackathons/${id}`, hackathonData);
    return response.data.hackathon;
  },

  join: async (id) => {
    const response = await api.post(`/hackathons/${id}/join`);
    return response.data;
  }
};

// Teams API
export const teamsAPI = {
  getByHackathon: async (hackathonId) => {
    const response = await api.get(`/teams/hackathon/${hackathonId}`);
    return response.data.teams;
  },

  getById: async (id) => {
    const response = await api.get(`/teams/${id}`);
    return response.data.team;
  },

  create: async (teamData) => {
    const response = await api.post('/teams', teamData);
    return response.data.team;
  },

  join: async (id) => {
    const response = await api.post(`/teams/${id}/join`);
    return response.data.team;
  },

  leave: async (id) => {
    const response = await api.post(`/teams/${id}/leave`);
    return response.data;
  },

  update: async (id, teamData) => {
    const response = await api.put(`/teams/${id}`, teamData);
    return response.data.team;
  }
};

// Users API
export const usersAPI = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data.user;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data.user;
  },

  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data.user;
  }
};

// Submissions API
export const submissionsAPI = {
  getByHackathon: async (hackathonId) => {
    const response = await api.get(`/submissions/hackathon/${hackathonId}`);
    return response.data.submissions;
  },

  getById: async (id) => {
    const response = await api.get(`/submissions/${id}`);
    return response.data.submission;
  },

  create: async (submissionData) => {
    const response = await api.post('/submissions', submissionData);
    return response.data.submission;
  },

  update: async (id, submissionData) => {
    const response = await api.put(`/submissions/${id}`, submissionData);
    return response.data.submission;
  }
};

export default api;
