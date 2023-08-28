import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function CreateProjectForm({ onSubmit }) {
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [teamLeader, setTeamLeader] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [listRegularEmployees, setListRegularEmployees] = useState([]);
  const [listTeamLeaders, setListTeamLeaders] = useState([]);
  const [formErrors, setFormErrors] = useState({
    projectName: false,
    startDate: false,
    endDate: false,
    teamLeader: false,
    selectedEmployees: false
  });

  useEffect(() => {
    async function fetchRegularEmployees() {
      try {
        const response = await axios.get('http://localhost:8080/employees/byRole/REGULAR_EMPLOYEE');
        const options = response.data.map(employee => ({
          value: employee.employeeId,
          label: employee.employeeName
        }));
        setListRegularEmployees(options);
      } catch (error) {
        console.error('Error fetching regular employees:', error);
      }
    }

    async function fetchTeamLeaders() {
      try {
        const response = await axios.get('http://localhost:8080/employees/byRole/TEAM_LEADER');
        const options = response.data.map(employee => ({
          value: employee.employeeId,
          label: employee.employeeName
        }));
        setListTeamLeaders(options);
      } catch (error) {
        console.error('Error fetching team leaders:', error);
      }
    }

    fetchRegularEmployees();
    fetchTeamLeaders();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!projectName || !startDate || !endDate || !teamLeader || selectedEmployees.length === 0) {
      setFormErrors({
        projectName: !projectName,
        startDate: !startDate,
        endDate: !endDate,
        teamLeader: !teamLeader,
        selectedEmployees: selectedEmployees.length === 0
      });
      return;
    }

    // Create a project object to submit
    const projectData = {
      // ...
    };

    try {
      const response = await axios.post('http://localhost:8080/projects', projectData);
      console.log('Project created:', response.data);
      // You can perform additional actions on successful response
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-300'>
    <form onSubmit={handleFormSubmit} className="mx-auto min-w-[90%] bg-white shadow-xl rounded-xl xl:min-w-[45%] p-4 border ">
      <div className="mb-4">
        <label htmlFor="projectName" className="block font-medium text-gray-700">
          Project Name
        </label>
        <input
          type="text"
          id="projectName"
          name="projectName"
          value={projectName}
          placeholder='Project Name'
          onChange={(e) => setProjectName(e.target.value)}
          className={`mt-1 p-2 border-2 border-slate-300 shadow placeholder:text-gray-600 rounded-md w-full ${formErrors.projectName ? 'border-red-500' : ''}`}
        />
        {formErrors.projectName && <p className="text-red-500 text-sm mt-1">Project name is required.</p>}
      </div>

     {/* Other form fields */}
<div className="mb-4">
  <label className="block font-medium text-gray-700">Team Leader</label>
  <Select
    options={listTeamLeaders}
    value={teamLeader}
    onChange={setTeamLeader}
    className={`mt-1 border-2 border-slate-300 shadow placeholder:text-gray-600 rounded-md ${formErrors.teamLeader ? 'border-red-500' : ''}`}
  />
  {formErrors.teamLeader && <p className="text-red-500 text-sm mt-1">Team leader is required.</p>}
</div>

<div className="mb-4">
  <label className="block font-medium text-gray-700">Selected Employees</label>
  <Select
    options={listRegularEmployees}
    isMulti
    value={selectedEmployees}
    onChange={setSelectedEmployees}
    className={`mt-1 border-2 border-slate-300 shadow placeholder:text-gray-600 rounded-md ${formErrors.selectedEmployees ? 'border-red-500' : ''}`}
  />
  {formErrors.selectedEmployees && <p className="text-red-500 text-sm mt-1">At least one employee is required.</p>}
</div>

<div className="mb-4">
  <label htmlFor="startDate" className="block font-medium text-gray-700">
    Start Date
  </label>
  <input
    type="date"
    id="startDate"
    name="startDate"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    className={`mt-1 p-2  rounded-md w-full border-2 border-slate-300 shadow placeholder:text-gray-600 ${formErrors.startDate ? 'border-red-500' : ''}`}
  />
  {formErrors.startDate && <p className="text-red-500 text-sm mt-1">Start date is required.</p>}
</div>

<div className="mb-4">
  <label htmlFor="endDate" className="block font-medium text-gray-700">
    End Date
  </label>
  <input
    type="date"
    id="endDate"
    name="endDate"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
    className={`mt-1 p-2 border-2 border-slate-300 shadow placeholder:text-gray-600 rounded-md w-full ${formErrors.endDate ? 'border-red-500' : ''}`}
  />
  {formErrors.endDate && <p className="text-red-500 text-sm mt-1">End date is required.</p>}
</div>
<div className='flex justify-center'>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
        Create Project
      </button>
</div>
    </form>
    </div>
  );
}

export default CreateProjectForm;
