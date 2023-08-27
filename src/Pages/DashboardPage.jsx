import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DashboardPage() {
   const { empID }=useParams()

  const [employeeProjects, setEmployeeProjects] = useState([]);
  const [createdProjects, setCreatedProjects] = useState([]);

  useEffect(() => {
    // Fetch employee projects and created projects based on the logged-in employee ID
 try {
    
     const response=  axios.get(`http://localhost/projects/employee/${empID}`)
     console.log(response);
 } catch (error) {
    console.log("error response on project",error);
 }
 

  }, [empID]);

  return (
    <div>
      <div className="project-list left">
        <h2>Projects Employee is Part Of</h2>
        <ul>
          {employeeProjects.map((project) => (
            <li key={project.id}>{project.name}</li>
          ))}
        </ul>
      </div>
      <div className="project-list right">
        <h2>Projects Created by Employee</h2>
        <ul>
          {createdProjects.map((project) => (
            <li key={project.id}>{project.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DashboardPage;
