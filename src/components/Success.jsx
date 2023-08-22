import React from 'react';
import { useNavigate } from 'react-router-dom';

function Success() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <div className="flex justify-center items-center h-25vh p-10">
        <h2 className="text-green">Registration Successful</h2>
      </div>
      <div className="flex justify-center items-center h-5vh">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
         type="submit" onClick={handleLoginClick}>
  Login
</button>

      </div>
    </>
  );
}

export default Success;
