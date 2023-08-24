import React from 'react';

const EmployeeProjectTable = () => {
  return (
    <div className="mx-auto my-auto p-10 overflow-x-auto">
      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-4">Employee Project Details</h2>

      {/* Table */}
      <div className="shadow-md rounded-lg overflow-hidden">
        <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-200">
              <th className="w-1/12 px-4 py-2">S. No</th>
              <th className="w-3/12 px-4 py-2">Project Name/Miscellaneous</th>
              <th className="w-1/12 px-4 py-2">Activity</th>
              <th className="w-2/12 px-4 py-2">Planned Date of Completion</th>
              <th className="w-2/12 px-4 py-2">Actual Date of Completion</th>
              <th className="w-1/12 px-4 py-2">No Of Hours</th>
              <th className="w-2/12 px-4 py-2">Deliverable</th>
              <th className="w-2/12 px-4 py-2">Remarks/Quality</th>
            </tr>
          </thead>
          <tbody>
            {/* Add your data here */}
            <tr className="bg-gray-100">
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">Project A</td>
              <td className="px-4 py-2">Coding</td>
              <td className="px-4 py-2">2023-08-20</td>
              <td className="px-4 py-2">2023-08-22</td>
              <td className="px-4 py-2">8</td>
              <td className="px-4 py-2">Code implementation</td>
              <td className="px-4 py-2">Completed on time</td>
            </tr>
            
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>

      {/* Additional columns */}
      <table className="w-full table-auto mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Feedback / Points for discussion / Leave Details</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-100">
            <td className="px-4 py-2"></td>
          </tr>
        </tbody>
      </table>

      {/* Expected Activities of upcoming week */}
      <table className="w-full table-auto mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Expected Activities of upcoming week</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-100">
            <td className="px-4 py-2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeProjectTable;
