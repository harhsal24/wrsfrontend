import React from 'react';
import { useNavigate } from 'react-router-dom';




const ReportInterface = () => {   

    const navigate=useNavigate(); 

    const handleClickCurrent=()=>{
      navigate("/employeeform");
    }; 
        
    const handleClickPrevious=()=>{
      navigate("/employee-details");
    };
  return (
    <div className="bg-aliceblue min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4">Weekly Report Submission</h2>
      <div className="flex space-x-5">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
          onClick={handleClickPrevious}
        >
          View Previous Week Report
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none"
          onClick={handleClickCurrent}
        >
          Fill Current Week Report
        </button>
      </div>
    </div>
  );
};

export default ReportInterface;
