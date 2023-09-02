import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Avatar from 'react-avatar';
import randomColor from 'randomcolor';
import ReportCard from './ReportCard';
import api from "../api"
const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    async function fetchProjectDetails() {
      try {
        const response = await api.get(`http://localhost:8080/projects/${projectId}`);
        setProject(response.data);
        // console.log("project data",response.data)
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    }

    fetchProjectDetails();
  }, [projectId]);

  return (
    <div className=" mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
      {project ? (
        <div>
          <div className="mb-2" >
          <Avatar
          name={project.projectName}
          size="35" 
          round={true}
          color={randomColor({ seed: project.projectName})}
          className="ml-1 mr-2"
        />
            <span className="font-semibold">Project Name:</span> {project.projectName}
          </div>
          <Link to={`/employeeDetail/${project.teamLeader.employeeId}`}>
          <div className="mb-2">
          <Avatar
          name={project.teamLeader.employeeName}
          size="35" 
          round={true}
          color={randomColor({ seed: project.teamLeader.employeeName})}
          className="ml-1 mr-2"
        />
            <span className="font-semibold">Team Leader:</span> {project.teamLeader.employeeName}
          </div>
          </Link>
          <p className="mb-2">
            <span className="font-semibold">Start Date:</span> {moment(project.startDate).format("DD-MM-YYYY")}
          </p>
          <p className="mb-2">
            <span className="font-semibold">End Date:</span> {moment(project.expectedEndDate).format("DD-MM-YYYY")}
          </p>
          <div>
          Employees working on Project :
          <div className='flex gap-x-5 my-2'>

          
          {project && project.employees.map((item)=>(
              <div key={item.employeeId}>
                <Link to={`/employeeDetail/${item.employeeId}`} >
                <div>      <Avatar
          name={item.employeeName}
          size="35" 
          round={true}
          color={randomColor({ seed: item.employeeName})}
          className="ml-1 mr-2"
        /> {item.employeeName}
        
        </div>
        
        </Link>
            </div>
          ))}</div>
          </div>
          <div>
          {project && project.weeklyReports.map((item)=>(
             <ReportCard key={item.reportId} report={item} button={false} />
          ))}
          </div>
        </div>
      ) : (
        <p>Loading project details...</p>
      )}
    </div>
  );
};

export default ProjectDetailPage;
