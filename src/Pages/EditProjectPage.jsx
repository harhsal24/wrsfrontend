import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useParams } from 'react-router-dom';
import moment from 'moment';



function EditProjectPage() {
    const { projectId } = useParams();
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [teamLeader, setTeamLeader] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [listRegularEmployees, setListRegularEmployees] = useState([]);
  const [listTeamLeaders, setListTeamLeaders] = useState([]);

  useEffect(() => {
    async function fetchProjectDetails() {
        try {
            // Fetch project details by project ID
            const response = await axios.get(`http://localhost:8080/projects/${projectId}`);
            console.log(response);
            const project = response.data;
            setProjectName(project.projectName);
            setStartDate(moment(project.startDate).format('YYYY-MM-DD')); // Format the start date
            setEndDate(moment(project.expectedEndDate).format('YYYY-MM-DD')); // Format the end date
            setTeamLeader({ value: project.teamLeader.employeeId, label: project.teamLeader.employeeName });
            const selectedEmployeeOptions = project.employees.map(employee => ({
                value: employee.employeeId,
                label: employee.employeeName
            }));
            setSelectedEmployees(selectedEmployeeOptions);
        } catch (error) {
            console.error('Error fetching project details:', error);
        }
      }
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
  
      fetchProjectDetails();
      fetchRegularEmployees();
      fetchTeamLeaders();

  }, [projectId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create a project object to submit
    const projectData = {
        teamLeader: { employeeId: teamLeader.value, employeeName: teamLeader.label },
        employees: selectedEmployees.map(employee => ({
          employeeId: employee.value,
          employeeName: employee.label
        })),
        projectId, 
        projectName,
        startDate,
        expectedEndDate: endDate
      };
      
    try {
      // Update project details
      await axios.put(`http://localhost:8080/projects/${projectId}`, projectData);
      console.log("Successfully Updated Project");
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

  return (
    <form onSubmit={handleFormSubmit}>
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
        className="mt-1 p-2 border rounded-md w-full"
    />
</div>


      <div className="mb-4">
        <label className="block font-medium text-gray-700">Select New Team Leader</label>
        <Select
          options={listTeamLeaders}
          value={teamLeader}
          onChange={setTeamLeader}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium text-gray-700">Select New Members</label>
        <Select
          options={listRegularEmployees}
          isMulti
          value={selectedEmployees}
          onChange={setSelectedEmployees}
        />
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
                    className="mt-1 p-2 border rounded-md w-full"
                    placeholder="dd-mm-yyyy"
                    min="1900-01-01"
                />
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
                    className="mt-1 p-2 border rounded-md w-full"
                    placeholder="dd-mm-yyyy"
                    min="1900-01-01"
                />
            </div>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
      Update Project
      </button>
    </form>
  );
}

export default EditProjectPage;
