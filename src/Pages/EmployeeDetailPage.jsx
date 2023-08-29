import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import randomColor from 'randomcolor';
import ProjectCard from './ProjectCard';
import ReportCard from './ReportCard';

const EmployeeDetailPage = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [projects, setProjects] = useState([]);
const [reports, setReports] = useState();
  useEffect(() => {
    async function fetchEmployeeDetails() {
      try {
        const response = await axios.get(`http://localhost:8080/employees/${employeeId}`);
        setEmployee(response.data);
        setProjects(response.data.projects)
        setReports(response.data.weeklyReports)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    }

    fetchEmployeeDetails();
  }, [employeeId]);

  return (
    <div className=" mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Employee Details</h2>
      {employee ? (
        <div>
        
          <div className="mb-2">
          <Avatar
          name={employee.name}
          size="35" 
          round={true}
          color={randomColor({ seed: employee.name})}
          className="ml-1 mr-2"
        />
            <span className="font-semibold">Employee Name:</span> {employee.name}
          </div>
          
          <p className="mb-2">
            <span className="font-semibold">Email:</span> {employee.email}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Role:</span> {employee.role}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Gender:</span> {employee.gender}
          </p>
         
        </div>

      ) : (
        <p>Loading employee details...</p>
      )}
{projects.length>0  && 
(<div>
    TeamLeader in Projects : 
  {projects && projects.map((project)=>(
     <ProjectCard
     key={project.projectId}
     project={project}
     forShowDetails={true}
   />
  ))}  
</div>)}

<div>
    Reports Created are : 
    {
        reports && reports.map((report)=>(
            <ReportCard key={report.reportId} report={report} button={false} projectName={true} />
        ))
    }
</div>

    </div>
  );
};

export default EmployeeDetailPage;
