/*import React from 'react';*/
import React, { useState } from 'react';


const initialEmployeeData = [
  {
    empID: 'E001',
    name: 'John Doe',
    group: 'Development',
    projectName: 'Project A',
    activity: 'Coding',
    plannedDate: '2023-08-20',
    actualDate: '2023-08-22',
    workHours: 8,
    deliverable: 'Code implementation',
    remarks: 'Completed on time',
  },
  {  empID: 'E002',
  name: 'Tom Lakwoud',
  group: 'Development',
  projectName: 'Project A',
  activity: 'Coding',
  plannedDate: '2023-08-20',
  actualDate: '2023-08-22',
  workHours: 8,
  deliverable: 'Code implementation',
  remarks: 'Completed on time',},

];

const handleEdit = (index) => {
  
};

const handleDelete = (index) => {
  
};

const EmployeeTable = ({ employeeData,onEdit, onDelete }) => {
  return (
    <div className="employee-table-container">

      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore harum modi at, rem, quisquam alias ullam amet exercitationem dignissimos veritatis cum. Officiis rerum ex optio, provident ea nemo delectus quas.</p>
      <h2>Employee Details</h2>
      <table className="employee-table">
        <thead>
          <tr>
            <th>S. No</th>
            <th>Emp ID</th>
            <th>Name</th>
            <th>Group</th>
            <th>Project Name</th>
            <th>Activity</th>
            <th>Planned Date of Completion</th>
            <th>Actual Date of Completion</th>
            <th>No of Work Hours</th>
            <th>Deliverable</th>
            <th>Remarks</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {initialEmployeeData.length!=0 && initialEmployeeData.map((employee, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{employee.empID}</td>
              <td>{employee.name}</td>
              <td>{employee.group}</td>
              <td>{employee.projectName}</td>
              <td>{employee.activity}</td>
              <td>{employee.plannedDate}</td>
              <td>{employee.actualDate}</td>
              <td>{employee.workHours}</td>
              <td>{employee.deliverable}</td>
              <td>{employee.remarks}</td>
              <td>
                <button  className="text-red-300 text-[10px] ml-3 px-7 bg-cyan-300 py-3 rounded" onClick={() => onEdit(index)}>Edit</button>
              </td>
              <td>
                <button onClick={() => onDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;