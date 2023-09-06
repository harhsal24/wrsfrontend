import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useMutation, useQuery } from 'react-query';
import { useReportStore } from '../store/useReportStore';
import api from "../api"
import { showSuccessToast } from "./showSuccessToast";

function EditProjectPage() {
    const { projectId } = useParams();
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [teamLeader, setTeamLeader] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [reportDetails, setReportDetails] = useState([]);
  const [remark, setRemark] = useState("");
  const [
    expectedActivitiesOfUpcomingWeek,
    setExpectedActivitiesOfUpcomingWeek,
  ] = useState("");

  // teamLeader

  // employeeId
  
  // employeeName
  
  const setSelectedProjectId = useReportStore(state => state.setSelectedProjectId);

  const { data: listRegularEmployees } = useQuery('regularEmployees', async () => {
    const response = await api.get('http://localhost:8080/employees/byRole/REGULAR_EMPLOYEE');
    return response.data.map(employee => ({
      value: employee.employeeId,
      label: employee.employeeName
    }));
  });

  const { data: listTeamLeaders } = useQuery('teamLeaders', async () => {
    const response = await api.get('http://localhost:8080/employees/byRole/TEAM_LEADER');
    return response.data.map(employee => ({
      value: employee.employeeId,
      label: employee.employeeName
    }));
  });

  const { data: projectDetails } = useQuery(['project', projectId], async () => {
    const response = await api.get(`http://localhost:8080/projects/${projectId}`);
    setProjectName(response.data.projectName)
    setEndDate(response.data.expectedEndDate)
    setStartDate(response.data.startDate)
    setTeamLeader({
      value:response.data.teamLeader.employeeId,
      label:response.data.teamLeader.employeeName
    })
    setSelectedEmployees(response.data.employees.map(employee => ({
      value: employee.employeeId,
      label: employee.employeeName
    })));
    console.log(response.data)
    return response.data;
  });

  const [formErrors, setFormErrors] = useState({
    projectName: false,
    startDate: false,
    endDate: false,
    teamLeader: false,
    selectedEmployees: false
  });


  const editProjectMutation = useMutation(async (projectData) => {
    console.log("updated project data",projectData);
    await api.put(`http://localhost:8080/projects/${projectId}`, projectData);
  });

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


 // Check if end date is less than start date
 if (moment(endDate).isBefore(startDate)) {
  setFormErrors({
    ...formErrors,
    endDate: true,
  });
  return;
}

const projectData = {
  teamLeader: {
    employeeId: teamLeader.value,
    employeeName: teamLeader.label
  },
  employees: selectedEmployees.map(employee => ({
    employeeId: employee.value,
    employeeName: employee.label
  })),
  projectId:projectId,
  projectName: projectName,
  startDate: startDate,
  expectedEndDate: endDate
};



   // Update project details
  editProjectMutation.mutateAsync(projectData);
  showSuccessToast('Project Updated');
  setSelectedProjectId(projectId); 
  };

return (
  <div className='flex items-center justify-center min-h-screen bg-gray-100'>
  <form onSubmit={handleFormSubmit} className="mx-auto min-w-[90%]  xl:min-w-[45%] p-4 border rounded shadow-md">
    <div className="mb-4">
      <label htmlFor="projectName" className="block font-medium text-gray-700">
        Project Name
      </label>
      <input
        type="text"
        id="projectName"
        name="projectName"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className={`mt-1 p-2 border rounded-md w-full ${formErrors.projectName ? 'border-red-500' : ''}`}
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
  className={`mt-1 ${formErrors.teamLeader ? 'border-red-500' : ''}`}
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
  className={`mt-1 ${formErrors.selectedEmployees ? 'border-red-500' : ''}`}
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
  className={`mt-1 p-2 border rounded-md w-full ${formErrors.startDate ? 'border-red-500' : ''}`}
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
  className={`mt-1 p-2 border rounded-md w-full ${formErrors.endDate ? 'border-red-500' : ''}`}
/>
{formErrors.endDate && <p className="text-red-500 text-sm mt-1">End date is required.</p>}
</div>
<div className='flex justify-center'>

    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
      Save Project
    </button>
</div>
  </form>
  </div>
);
}

export default EditProjectPage;
