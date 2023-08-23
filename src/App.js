import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Demo from './components/Demo';
import EmployeeTable from './components/EmployeeTable';
import EmployeeView from './Pages/EmployeeView'
import CreateProjectForm from './Pages/CreateProjectForm';
import EditProjectPage from './Pages/EditProjectPage';
import CreateWeeklyReportPage from './Pages/CreateWeeklyReportPage';
import EditWeeklyReportPage from './Pages/EditWeeklyReportPage';
import Login from './Pages/Login';


function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Demo />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/abc" element={<EmployeeTable />} /> 
        <Route path="/e" element={<EmployeeView />} /> 
        <Route path="/createProject" element={<CreateProjectForm />} /> 
       <Route path="/editProject/:projectId" element={<EditProjectPage  />} /> 
       <Route path="/createWeeklyReport/:employeeId/:projectId" element={<CreateWeeklyReportPage  />} /> 
       <Route  path="/editWeeklyReport/:reportId" element={<EditWeeklyReportPage  />} />
      </Routes>
 
  );
}

export default App;



