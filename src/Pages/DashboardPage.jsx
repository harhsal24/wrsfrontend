import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ReportCard from './ReportCard';
import ProjectCard from './ProjectCard';

function DashboardPage() {
  const { empID } = useParams();
  const [listProjects, setListProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(false);


  useEffect(() => {
    const fetchProjectList = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/projects/employee/${empID}`);
        setListProjects(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error response on project", error);
      }
    };

    fetchProjectList();
  }, [empID]);



  return (
    <div className='p-4 xl:flex xl:items-center xl:justify-center bg-gray-200 '>
      <div className='md:flex md:gap-x-1 xl:gap-x-6 '>
        <div className="bottom-3">
          <h2 className="text-lg font-semibold mb-3">Projects Employee is Part Of</h2>
          <div className='w-full border-2 px-2 xl:p-5 rounded-md md:h-screen scroll md:overflow-y-scroll'>
            {listProjects != null &&
              listProjects.map((project, index) => (
                <ProjectCard
                  key={project.projectId}
                  project={project}
                  selected={selectedProjectId === project.projectId}
                  setSelectedProjectId={setSelectedProjectId}
                />
                
              ))}
              {/* Add Project Button */}
              <div className='flex items-center justify-center'>
            <Link to="/createProject">
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Add Project
              </button>
            </Link>
              </div>
          </div>
        </div>
        {selectedProjectId &&

<div className="border-3 ">
          <h2 className="text-lg font-semibold mb-3">Reports for Selected Project</h2>
          <div className='border-2 p-2 xl:p-4 md:h-screen scroll md:overflow-y-scroll'>
            {listProjects != null &&
              listProjects.map((project) => (
                <div key={project.projectId}>
                  {selectedProjectId === project.projectId &&
                    project.weeklyReports.length !== 0 &&
                    project.weeklyReports
                      .sort((a, b) => {
                        if (a.reportStatus === 'IN_PROCESS' && b.reportStatus === 'APPROVED') {
                          return -1;
                        } else if (a.reportStatus === 'APPROVED' && b.reportStatus === 'IN_PROCESS') {
                          return 1;
                        } else {
                          return 0;
                        }
                      })
                      .map((report) => (
                        <ReportCard key={report.reportId} report={report} />
                      ))}
                      {/* Create Report Button */}

                </div>
              ))}
              <div className='flex items-center w-full justify-center'>

                <Link to="/createReport">
    <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
      Create Report
    </button>
  </Link>
              </div>
          </div>
        </div>
        }
        
      </div>
    </div>
  );
}

export default DashboardPage;
