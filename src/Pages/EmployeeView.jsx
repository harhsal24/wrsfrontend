import React, { useState } from 'react';
import ProjectList from '../components/ProjectList';
import ReportList from '../components/ReportList';


const EmployeeView = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      name: 'Project A',
      teamLead: 'John Doe',
      endDate: '2023-12-31',
    },
    
  ];

  const reports = [
    {
      id: 1,
      createdDate: '2023-08-20',
      status: 'Submitted',
      approved: false,
    },

  ];

  const selectProject = projectId => {
    setSelectedProject(projectId);
  };

  return (
    <div className="flex">
      <ProjectList projects={projects} selectProject={selectProject} />
      {selectedProject ? (
        <ReportList reports={reports} />
      ) : (
        <div className="w-2/3 bg-white p-4 h-screen">
          <p className="text-lg font-semibold">Select a project to view reports.</p>
        </div>
      )}
    </div>
  );
};

export default EmployeeView;
