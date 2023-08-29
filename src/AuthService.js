
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const AuthService = {
    login: async (username, password) => {
        try {
          const response = await axios.post(`${API_URL}/login`, { username, password });
          const { accessToken, refreshToken } = response.data;
    
          if (accessToken && refreshToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
          }
        } catch (error) {
          console.error('Login failed:', error);
          throw error;
        }
      },
      logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      },
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  
  setTokens(accessToken, refreshToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  clearTokens() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  isLoggedIn() {
    const accessToken = this.getAccessToken();
    return !!accessToken && !this.isTokenExpired(accessToken);
  },

  isTokenExpired(token) {
    const decodedToken = jwt_decode(token);
    return Date.now() > decodedToken.exp * 1000;
  },
  isAuthenticated: () => {
    const accessToken = AuthService.getAccessToken();
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);
      return Date.now() < decodedToken.exp * 1000; // Check if token is not expired
    }
    return false;
  },
   refreshAccessToken :async () => {
    try {
      const response = await api.post('/refresh-token', {
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
  },
};
