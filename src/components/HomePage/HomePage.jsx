import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleEmployeeLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="bg-aliceblue min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Weekly Report Submission</h2>
        <div className='flex space-x-5'>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
            onClick={handleEmployeeLoginClick}
          >
            Employee Login
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
            onClick={handleRegisterClick}
          >
            Registration
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
