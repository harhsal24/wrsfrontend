import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeTable from './Pages/EmployeeTable';
import Login from "./Pages/Login";
import HomePage from './components/HomePage/HomePage';
import EmployeeLogin from './components/LoginPage/EmployeeLogin';
import Registration from './Pages/Registration';
import Success from './components/Pages/Success';
import ReportInterface from './components/Pages/ReportInterface';
import EmployeeDetailPrevious from './components/Employee/EmployeeDetailPrevious';
import EmployeeForm from './components/Employee/EmployeeForm';
import EmployeeProjectTable from './components/Employee/EmployeeProjectTable';
import DashboardPage from './Pages/DashboardPage';
import CreateProjectForm from './Pages/CreateProjectForm';
import CreateWeeklyReportPage from './Pages/CreateWeeklyReportPage'
import EditProjectPage from './Pages/EditProjectPage';
import EditWeeklyReportPage from './Pages/EditWeeklyReportPage';



function App() {
  return (

      <Routes>    
        
        <Route path="/" element ={<HomePage/>}/>   
        <Route path="/employee-login" element={<EmployeeLogin/>}/> 
        <Route path="/register" element={<Registration/>}/>     
        <Route path="/test" element={<EmployeeTable />} />  
        <Route path="/success" element={<Success/>}/> 
        <Route path="/reportinterface" element={<ReportInterface/>}/> 
        <Route path="/employee-details" element={<EmployeeDetailPrevious/>}/> 
        <Route path="/employeeform" element={<EmployeeForm/>}/> 
        <Route path="/employee-project-table" element={<EmployeeProjectTable/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/createProject' element={<CreateProjectForm/>}/>
        <Route path="/createWeeklyReport/:employeeId/:projectId" element={<CreateWeeklyReportPage  />}/> 
        <Route path="/editWeeklyReport/:reportId" element={<EditWeeklyReportPage />}/> 

        <Route path='/dashboard/:empID' element={<DashboardPage/>}/>


      </Routes>
 
  );
}

export default App;



