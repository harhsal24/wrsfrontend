import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeForm = () => {
  // Define state variables for form fields
  const [plannedDate, setPlannedDate] = useState('');
  const [actualDate, setActualDate] = useState('');
  const [workHours, setWorkHours] = useState('');
  const [deliverable, setDeliverable] = useState('');
  const [remarks, setRemarks] = useState('');
  const [others, setOthers] = useState('');
  const [feedback, setFeedback] = useState('');
  const [expectedActivity, setExpectedActivity] = useState('');

  const navigate=useNavigate();
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); 
     navigate("/employee-project-table");
    // You can process the form data here (e.g., send it to a server)
    console.log('Form submitted with data:', {
      plannedDate,
      actualDate,
      workHours,
      deliverable,
      remarks,
      others,
      feedback,
      expectedActivity,
    });
  };    
       
  return (
    <div className="mx-auto mt-8 p-6 border rounded-lg shadow-lg w-3/4">
      <h2 className="text-2xl font-semibold mb-4">Project Details To Be Filled By Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="plannedDate" className="block text-gray-600 mb-2">
            Planned Date of Completion <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="plannedDate"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={plannedDate}
            onChange={(e) => setPlannedDate(e.target.value)} 
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="actualDate" className="block text-gray-600 mb-2">
            Actual Date of Completion <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="actualDate"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={actualDate}
            onChange={(e) => setActualDate(e.target.value)} 
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="workHours" className="block text-gray-600 mb-2">
            No of Work Hours <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="workHours"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={workHours}
            onChange={(e) => setWorkHours(e.target.value)} 
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="deliverable" className="block text-gray-600 mb-2">
            Deliverable <span className="text-red-500">*</span>
          </label>
          <textarea
            id="deliverable"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={deliverable}
            onChange={(e) => setDeliverable(e.target.value)}  
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="remarks" className="block text-gray-600 mb-2">
            Remarks <span className="text-red-500">*</span>
          </label>
          <textarea
            id="remarks"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)} 
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="others" className="block text-gray-600 mb-2">
            Others
          </label>
          <input
            type="text"
            id="others"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={others}
            onChange={(e) => setOthers(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="feedback" className="block text-gray-600 mb-2">
            Feedback
          </label>
          <textarea
            id="feedback"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="expectedActivity" className="block text-gray-600 mb-2">
            Expected Activity of Next Week
          </label>
          <textarea
            id="expectedActivity"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={expectedActivity}
            onChange={(e) => setExpectedActivity(e.target.value)}
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4 hover:bg-blue-700 focus:outline-none"
           >
            Submit
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none"
            onClick={() => {
              // Reset form fields when Cancel is clicked
              setPlannedDate('');
              setActualDate('');
              setWorkHours('');
              setDeliverable('');
              setRemarks('');
              setOthers('');
              setFeedback('');
              setExpectedActivity('');
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
