import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeTable from './components/EmployeeTable';
import HomePage from './components/HomePage/HomePage';
import EmployeeLogin from './components/LoginPage/EmployeeLogin';
import Registration from './components/RegistrationPage/Registration';
import Success from './components/Pages/Success';
import ReportInterface from './components/Pages/ReportInterface';
import EmployeeDetailPrevious from './components/Employee/EmployeeDetailPrevious';
import EmployeeForm from './components/Employee/EmployeeForm';
import EmployeeProjectTable from './components/Employee/EmployeeProjectTable';



function App() {
  return (
      <Routes>    
        
        <Route path="/" element ={<HomePage/>}/>   
        <Route path="/employee-login" element={<EmployeeLogin/>}/> 
        <Route path="/registration" element={<Registration/>}/>     
        <Route path="/employeetable" element={<EmployeeTable />} />  
        <Route path="/success" element={<Success/>}/> 
        <Route path="/reportinterface" element={<ReportInterface/>}/> 
        <Route path="/employee-details" element={<EmployeeDetailPrevious/>}/> 
        <Route path="/employeeform" element={<EmployeeForm/>}/> 
        <Route path="/employee-project-table" element={<EmployeeProjectTable/>}/>
      </Routes>
 
  );
}

export default App;



