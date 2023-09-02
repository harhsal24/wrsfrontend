import axios from "axios";
import jwt_decode from 'jwt-decode';
import api from "./api"

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const API_URL="http://localhost:8080"

export const AuthService = {
  login: async function(username, password) {
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      const { accessToken, refreshToken } = response.data;

      if (accessToken && refreshToken) {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  logout: function() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  getTokenExpiration: function() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);
      return decodedToken.exp * 1000; // Convert to milliseconds
    }
    return 0; // Return 0 if token is not found
  },
  getAccessToken : function() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  getRefreshToken: function() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  setAccessToken: function(accessToken) {
   return localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  },
  setRefreshToken: function(refreshToken) {
    return localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },
  clearTokens: function() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  isAuthenticated: function() {
    const accessToken = AuthService.getAccessToken();
    return !!accessToken;
  },
  refreshAccessToken: async function() {
    try {
      const response = await axios.post(`${API_URL}/refresh-token`, {
        accessToken: AuthService.getAccessToken(),
        refreshToken: AuthService.getRefreshToken(),
      });
      if (response && response.data.accessToken) {
        AuthService.setAccessToken(response.data.accessToken);
        return response.data;
      } else {
        throw new Error('Access token refresh failed');
      }
    } catch (error) {
      throw new Error('Access token refresh failed');
    }
  }
};
