import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useAuthStore, useLoginStore } from '../store/loginStore';
import useUserEmployeeStore from '../store/userEmployeeStore';
import {AuthService} from './../AuthService'

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const errorMessage = useLoginStore((state) => state.errorMessage);
  const setErrorMessage = useLoginStore((state) => state.setErrorMessage);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const setLoggedInEmployee = useUserEmployeeStore((state) => state.setLoggedInEmployee);
  
  const handleLogin = async () => {
    if (loading) return; // Prevent multiple login attempts
    setLoading(true);
    setErrorMessage(null);
    
    try {
      const response = await axios.post('http://localhost:8080/login', { login, password });
      const { token, empId, role, accessToken, refreshToken } = response.data;

      if (accessToken && refreshToken) {

        AuthService.setAccessToken(accessToken)
        AuthService.setRefreshToken(refreshToken)

        useUserEmployeeStore.setState({ accessToken, refreshToken });
      }

      if (response.status === 200) {
        const employeeData = { empId, role };
        useUserEmployeeStore.setState({ loggedInEmployee: employeeData });
        queryClient.setQueryData('authToken', token);

        // Navigate based on user's role
        if (role === 'SUPER_ADMIN') {
          navigate(`/admin/dashboard/${empId}`);
        } else if (role === 'TEAM_LEADER') {
          navigate(`/teamLeader/dashboard/${empId}`);
        } else {
          navigate(`/employee/dashboard/${empId}`);
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Invalid login or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 " >
      <div className="max-w-md w-full mx-auto p-8  bg-white shadow-xl rounded-xl">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}
        <div className="mb-4">
          <label htmlFor="username" className="block mb-1 font-medium">Username</label>
          <input
            placeholder='Username'
            type="text"
            id="username"
            className="w-full p-2 border-2 border-slate-300  shadow placeholder:text-gray-600 rounded-md focus:ring focus:ring-blue-300"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-medium">Password</label>
          <input
            placeholder='Password'
            type="password"
            id="password"
            className="w-full p-2 border-2 border-slate-300 shadow placeholder:text-gray-600 rounded-md focus:ring focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className={`w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className='flex justify-between mt-2'> 
          <div className="mt-2">
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div className="mt-2">
            <Link to="/register" className="text-blue-500 hover:underline">
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
