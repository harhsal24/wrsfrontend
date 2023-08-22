import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EmployeeTable from './components/EmployeeTable';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Registration from './components/Registration';
import Success from './components/Success';



function App() {
  return (
      <Routes>  
        <Route path="/" element ={<HomePage/>}/>   
        <Route path="/login" element={<Login/>}/> 
        <Route path="/register" element={<Registration/>}/>     
        <Route path="/employeetable" element={<EmployeeTable />} />  
        <Route path="/success" element={<Success/>}/>
      </Routes>
 
  );
}

export default App;



