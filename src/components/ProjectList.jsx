import React from 'react';

const ProjectList = ({ projects, selectProject }) => {
  return (
    <div className="w-1/3 bg-gray-100 p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-semibold mb-2">Projects</h2>
      <ul className="space-y-2">
        {projects.map(project => (
          <li
            key={project.id}
            onClick={() => selectProject(project.id)}
            className="cursor-pointer hover:bg-gray-200 p-2 rounded"
          >
            <p className="font-semibold">{project.name}</p>
            <p>Team Lead: {project.teamLead}</p>
            <p>End Date: {project.endDate}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <p className="cursor-pointer text-blue-500 hover:underline">All Reports</p>
      </div>
    </div>
  );
};

export default ProjectList;
