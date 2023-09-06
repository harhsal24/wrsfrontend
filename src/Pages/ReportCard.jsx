import React from 'react';
import Avatar from 'react-avatar';
import randomColor from 'randomcolor';
import { FaCheck, FaHourglassStart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import useUserEmployeeStore from '../store/userEmployeeStore';
const ReportCard = ({ report, showButton,projectName }) => {
const navigate=useNavigate();

  const loggedInEmployee = useUserEmployeeStore((state) => state.loggedInEmployee);

  const formatDate = (dateString) => {
    const options = {
      day: 'numeric',
      month: 'short', // Change 'short' to 'long' if you want the full month name
      year: 'numeric',
    };
    let [month, day, year] = new Date(dateString)
      .toLocaleDateString('en-US', options)
      .split(' ');
    
      // Remove the last character from the day if it's a comma
  if (day.endsWith(',')) {
    day = day.slice(0, -1);
  }

    return `${day}-${month}-${year}`;
  };
  const getStatusText = (status) => {
    if (status === 'APPROVED') {
      return 'Approved';
    } else if (status === 'IN_PROGRESS') {
      return 'In Process';
    } else {
      return status;
    }
  };

  const renderActionButton = (status) => {
    if (status === 'APPROVED') {
      return (
        <button
          className={`relative top-3  px-3 py-1 flex items-center justify-center bg-green-200 text-green-600 rounded-md cursor-not-allowed`}
          disabled
          >
          Approved
            <FaCheck className="ml-2" />
        </button>
      );
    } else if (status === 'IN_PROGRESS') {
      return (
        <button
          className={`relative top-3 px-3 py-1 flex items-center justify-center bg-yellow-200  text-yellow-600 rounded-md`}
          >
          Evaluate
            <FaHourglassStart className="ml-2" />
        </button>
      );
    } else {
      return null;
    }
  };

  // Generate a color based on the person's name
  const avatarColor = randomColor({ seed: report.employee.employeeName });

 const handleCheckTeamLeader=()=>{
  if (
    loggedInEmployee.role === 'TEAM_LEADER' && report.reportStatus === 'IN_PROGRESS'
  ) {
    navigate(`/remark/${report.reportId}`);
  }
  }

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-4  mb-4 md:w-[400px] lg:w-[590px] xl:w-[800px] xl:my-3">
      <div className='flex items-center justify-between'>

      <Link to={`/employeeDetail/${report.employee.employeeId}`} >
      <div className='flex gap-x-2'>
        <Avatar
          name={report.employee.employeeName}
          size="40"
          round={true}
          color={avatarColor}
          style={{ marginRight: '10px' }}
          />
      <h4 className="text-lg font-semibold mt-2 mb-2">Created By {report.employee.employeeName}</h4>
      </div>
      </Link>
      
      <div>

     <div className={`ml-auto `} ><div to={`/remark/${report.reportId}`}   onClick={() => handleCheckTeamLeader()}>
        {renderActionButton(report.reportStatus)}</div>
        </div>
     
      </div>
          </div>
      { projectName && <p className='ml-auto'>For : {report.project.projectName } </p>}
      <p className="text-gray-600">At : {formatDate(report.reportCreatedDateTime)}</p>
      <p
        className={`font-semibold ${
          report.reportStatus === 'APPROVED'
            ? 'text-green-600'
            : 'text-yellow-500'
        }`}
      ><div className=' flex gap-x-3 items-center'>

        Report Status: {getStatusText(report.reportStatus)}
      <Link to={`/reportDetail/${report.reportId}`}>
      <p className='mx-3 text-blue-600 underline pb-1'>View</p></Link>
      </div>
      </p>
      <div className='flex justify-end'> 
      {report.reportStatus === 'IN_PROGRESS' &&
            loggedInEmployee.role === 'REGULAR_EMPLOYEE' && (
              <Link to={`/editWeeklyReport/${report.reportId}`} >
              <FaEdit
                className="cursor-pointer text-blue-500 hover:text-blue-600"/>
                </Link>
          )}
    </div>
    </div>
  );
};

export default ReportCard;
