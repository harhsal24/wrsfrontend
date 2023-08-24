import React from 'react';

function EmployeeTable({ employees, onBackClick }) {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="py-3">S No</th>
                  <th className="py-3">Employee Id</th>
                  <th className="py-3">Employee Name</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={employee.id}>
                    <td className="py-2">{index + 1}</td>
                    <td className="py-2">{employee.employeeId}</td>
                    <td className="py-2">{employee.employeeName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <button
              onClick={onBackClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeTable;
