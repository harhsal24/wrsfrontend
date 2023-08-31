import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { AuthService } from './AuthService';

const api = axios.create({
  baseURL: 'http://localhost:8080', 
});

// Intercept requests and handle token refresh
// Intercept requests and handle token refresh
api.interceptors.request.use(async (config) => {
  // console.log('Interceptor config:', config);
  const accessToken = AuthService.getAccessToken();
  // console.log("accessToken", accessToken);
  if (accessToken) {
    const expiration = AuthService.getTokenExpiration();
    const remainingTime = expiration - Date.now();
    const refreshThreshold = 5 * 60 * 1000; // 5 minutes

    if (remainingTime < refreshThreshold) {
      // Access token is about to expire, try to refresh it
      try {
        const response = await AuthService.refreshAccessToken();
        if (response) {
          // Update the access token in the request headers
          config.headers['Authorization'] = `Bearer ${response.accessToken}`;
        }
      } catch (error) {
        // Handle token refresh failure
        console.error('Token refresh failed:', error);
      }
    } else {
      // Access token is still valid, include it in the request headers
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
  }
  return config;
});


// Add a request interceptor to include the access token in the headers
// api.interceptors.request.use(config => {
//   const accessToken = localStorage.getItem('access_token');
//   console.log("access token",accessToken)
//   if (accessToken) {
//     config.headers['Authorization'] = `Bearer ${accessToken}`;
//   }
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

export default api;
