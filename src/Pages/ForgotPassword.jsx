import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import api from "../api"
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await api.post('http://localhost:8080/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      setErrorMessage('Failed to send reset email. Please check your email and try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full mx-auto p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
        {errorMessage && (
          <p className="text-red-500 mb-4">{errorMessage}</p>
        )}
        {message && (
          <p className="text-green-500 mb-4">{message}</p>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-2  border-2 border-slate-300 shadow placeholder:text-gray-600 rounded-md focus:ring focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type Email to reset the password"
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={handleForgotPassword}
        >
          Send Reset Email
        </button>
        <div className="mt-2">
          <Link to="/login" className="text-blue-500 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
