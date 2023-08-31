import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import randomColor from 'randomcolor';
import ProjectCard from './ProjectCard';
import ReportCard from './ReportCard';
import { useQuery } from 'react-query';
import useEmployeeDetailStore from '../store/useEmployeeDetailStore';
import api from "../api"



const EmployeeDetailPage = () => {
  const [projects, setProjects] = useState([])
  const [weeklyReports, setWeeklyReports] = useState([])

  const fetchEmployeeDetails = async (employeeId) => {
    const response = await api.get(`http://localhost:8080/employees/${employeeId}`);
    setLedProjects(response.data.ledProjects)
    setWeeklyReports(response.data.weeklyReports)
    setProjects(response.data.projects)
    setWeeklyReports(response.data.weeklyReports)
    console.log(response.data)
    return response.data;
  };


  const{employeeId}=useParams();

  const ledProjects = useEmployeeDetailStore(state => state.ledProjects);
  const setLedProjects = useEmployeeDetailStore(state => state.setLedProjects);
  const reports = useEmployeeDetailStore(state => state.reports);
  const setReports = useEmployeeDetailStore(state => state.setReports);

const { data: employee, isLoading, isError } = useQuery(['employee', employeeId], () => fetchEmployeeDetails(employeeId));



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
{ledProjects.length>0  && 
(<div>
    TeamLeader in Projects : 
  {ledProjects && ledProjects.map((project)=>(
     <ProjectCard
     key={project.projectId}
     project={project}
     forShowDetails={true}
     showDate={false}
   />
  ))}  
</div>)}
{projects.length>0  && 
(<div>
    Working in Projects : 
  {projects && projects.map((project)=>(
     <ProjectCard
     key={project.projectId}
     project={project}
     forShowDetails={true}
     showDate={false}
   />
  ))}  
</div>)}

<div>
    Reports Created are : 
    {
        weeklyReports && weeklyReports.map((report)=>(
            <ReportCard key={report.reportId} report={report} button={false} projectName={true} />
        ))
    }
</div>

    </div>
  );
};

export default EmployeeDetailPage;
