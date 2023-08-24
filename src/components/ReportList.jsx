import React from 'react';

const ReportList = ({ reports }) => {
  return (
    <div className="w-2/3 bg-white p-4 h-screen overflow-y-auto">
      <h2 className="text-xl font-semibold mb-2">Reports</h2>
      <ul className="space-y-2">
        {reports.map(report => (
          <li key={report.id} className="border-b pb-2">
            <p>Created Date: {report.createdDate}</p>
            <p>Status: {report.status}</p>
            <p>Approved: {report.approved ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportList;
