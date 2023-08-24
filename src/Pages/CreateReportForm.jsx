import React from 'react';
import CreateProjectForm from './CreateProjectForm';
import CreateReportForm from './CreateReportForm';

function App() {
  const handleCreateProject = (data) => {
    // Handle project creation logic here
    console.log('Create Project:', data);
  };

  const handleCreateReport = (data) => {
    // Handle report creation logic here
    console.log('Create Report:', data);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-4">Create Project</h1>
        <CreateProjectForm onSubmit={handleCreateProject} />
      </div>
      
      <div>
        <h1 className="text-2xl font-semibold mb-4">Create Report</h1>
        <CreateReportForm onSubmit={handleCreateReport} />
      </div>
    </div>
  );
}

export default App;
