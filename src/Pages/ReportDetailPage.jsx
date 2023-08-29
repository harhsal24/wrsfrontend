import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Avatar from 'react-avatar';
import randomColor from 'randomcolor';
import moment from 'moment';

const ReportDetailPage = () => {
  const { reportId } = useParams(); // Get the report ID from the URL params
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    // Fetch the report detail using Axios
    const fetchReportDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/reports/${reportId}`);
        setReportData(response.data);
        console.log("report data ", response.data);
      } catch (error) {
        console.error('Error fetching report detail:', error);
      }
    };

    fetchReportDetail();
  }, [reportId]);

  const getStatusText = (status) => {
 
    if (status === 'IN_PROGRESS') {
      return 'In Progress';
    } else if (status === 'APPROVED') {
      return 'Approved';
    } else {
      return 'Unknown';
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Report Detail</h2>
      <div className="bg-white rounded-lg shadow-md p-4">
  <h4 className="text-2xl font-semibold mb-2">Report ID: {reportId}</h4>
  {reportData && (
    <>
      <p className="text-lg">
        <Link to={`/employeeDetail/${reportData.employee.employeeId}`} >
        Created By:{' '}
        <Avatar
          name={reportData.employee.employeeName}
          size="35" // Increased the size for a bigger name
          round={true}
          color={randomColor({ seed: reportData.employee.employeeName })}
          className="ml-1 mr-2"
        />{' '}
        {reportData.employee.employeeName}
        </Link>
      </p>
      <p className="text-base">Created At: {moment(reportData.reportCreatedDateTime).format('DD-MM-YY')}</p>
      <p className="text-base">Report Status: {getStatusText(reportData.reportStatus)}</p>
      <p className="text-base" id={reportData.project.projectId}>
        For Project: {reportData.project.projectName}
      </p>
      <p className="text-base">
      <Link to={`/employeeDetail/${reportData.employee.employeeId}`} >
        TeamLeader:{' '}
        <Avatar
          name={reportData.project.teamLeader.employeeName}
          size="35" // Increased the size for a bigger name
          round={true}
          color={randomColor({
            seed: reportData.project.teamLeader.employeeName,
          })}
          className="ml-1 mr-2"
        />{' '}
        {reportData.project.teamLeader.employeeName}
        </Link>
      </p>
    </>
  )}
</div>

      <div className="mt-4">
        {reportData && reportData.reportDetailsList.length !== 0 && (
          <div className="shadow-md overflow-hidden border border-gray-300 rounded-lg overflow-x-scroll scroll">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border">Deliverables</th>
                  <th className="py-2 px-4 border">Planned Completion Date</th>
                  <th className="py-2 px-4 border">Actual Completion Date</th>
                  <th className="py-2 px-4 border">No of Hours</th>
                  <th className="py-2 px-4 border">Activity</th>
                </tr>
              </thead>
              <tbody className='text-center'>
                {reportData.reportDetailsList.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? 'bg-gray-50' : ''}
                  >
                    <td className="py-2 px-4 border">{item.deliverables}</td>
                    <td className="py-2 px-4 border">
                      {moment(item.plannedCompletionDate).format("DD-MM-YYYY")}
                    </td>
                    <td className="py-2 px-4 border">
                      {moment(item.actualCompletionDate).format("DD-MM-YYYY")}
                    </td>
                    <td className="py-2 px-4 border">{item.noOfHours}</td>
                    <td className="py-2 px-4 border">{item.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {reportData && (
  <div className="bg-gray-100 p-4 rounded-md shadow-md">
    <div className="mb-2">
      <p className="text-lg font-semibold">Remarks: {reportData.remark}</p>
    </div>
    <div className="mb-2">
      <p>Points for Discussion: {reportData.pointsForDiscussion}</p>
    </div>
    <div className="mb-2">
      <p>Expected Activities of Upcoming Week: {reportData.expectedActivitiesOfUpcomingWeek}</p>
    </div>
    <div className="mb-2">
      <p>Report Status: {reportData.reportStatus}</p>
    </div>  
  </div>
)}

    </div>
  );
};

export default ReportDetailPage;
