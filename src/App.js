import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Demo from './components/Demo';
import EmployeeTable from './components/EmployeeTable';



function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Demo />} /> 
        <Route path="/abc" element={<EmployeeTable />} /> 
      </Routes>
 
  );
}

export default App;



