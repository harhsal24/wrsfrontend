import React from 'react';
import Avatar from 'react-avatar';
import randomColor from 'randomcolor';
import { FaCheck, FaHourglassStart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const ReportCard = ({ report, button,projectName }) => {
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };
  const getStatusText = (status) => {
    if (status === 'APPROVED') {
      return 'Approved';
    } else if (status === 'IN_PROCESS') {
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
      <div className={`ml-auto ${button ? ' ': 'hidden'}`} >{renderActionButton(report.reportStatus)}</div>
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
      >
        Report Status: {getStatusText(report.reportStatus)}
      </p>
    </div>
  );
};

export default ReportCard;
