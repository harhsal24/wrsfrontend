import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ReportCard from './ReportCard';
import ProjectCard from './ProjectCard';
import { useReportStore } from '../store/useReportStore';
import { useQuery, useQueryClient } from 'react-query';
import api from "../api"
function DashboardPage_SuperAdmin() {
  const { empID } = useParams();
  const setSelectedProjectId = useReportStore(state => state.setSelectedProjectId);
  const selectedProjectId = useReportStore(state => state.selectedProjectId);

  const { data: listProjects, error, isLoading } = useQuery(['projects', empID], async () => {
    const response = await api.get(`http://localhost:8080/projects`);
    return response.data;
  });

  const queryClient = useQueryClient(); 

  const onDeleteSuccess = () => {
    queryClient.invalidateQueries(['projects', empID]); // Invalidate the cache for projects
  };


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
                  showDEbuttons={true}
                  onDeleteSuccess={onDeleteSuccess}
                  forShowDetails={false}
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
                        <ReportCard key={report.reportId} report={report}  />
                      ))}
                      {/* Create Report Button */}

                </div>
              ))}
              <div className='flex items-center w-full justify-center'>

              </div>
          </div>
        </div>
        }
        
      </div>
    </div>
  );
}

export default DashboardPage_SuperAdmin;
