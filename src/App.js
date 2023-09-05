import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import CreateProjectForm from './Pages/CreateProjectForm';
import ReportDetailPage from './Pages/ReportDetailPage';
import RemarkPage from './Pages/RemarkPage';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import useUserEmployeeStore from './store/userEmployeeStore';
import ForgotPassword from './Pages/ForgotPassword'
import EditProjectPage from './Pages/EditProjectPage'
 
import ProjectDetailPage from './Pages/ProjectDetailPage ' 
import EmployeeDetailPage from './Pages/EmployeeDetailPage'
import DashboardPage_RegularEmployee from './Pages/DashboardPage_RegularEmployee';
import DashboardPage_SuperAdmin from './Pages/DashboardPage_SuperAdmin';
import DashboardPage_TeamLeader from './Pages/DashboardPage_TeamLeader';
import CreateWeeklyReportPage from './Pages/CreateWeeklyReportPage';
import EditWeeklyReportPage from './Pages/EditWeeklyReportPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ProtectedRoute({ element }) {
  const loggedInEmployee = useUserEmployeeStore(state => state.loggedInEmployee);
  const navigate = useNavigate();

  if (!loggedInEmployee) {
    navigate('/login'); 
    return null;
  }

  return element
}

function App() {
  return (
    <div>

   
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

<Route path="/createProject" element={<ProtectedRoute element={<CreateProjectForm />} />} />
  <Route path="/editProject/:projectId" element={<ProtectedRoute element={<EditProjectPage />} />} />
  <Route path="/createWeeklyReport/:employeeId/:projectId" element={<ProtectedRoute element={<CreateWeeklyReportPage />} />} />
  <Route path="/editWeeklyReport/:reportId" element={<ProtectedRoute element={<EditWeeklyReportPage />} />} />
  <Route path="/reportDetail/:reportId" element={<ProtectedRoute element={<ReportDetailPage />} />} />
  <Route path="/remark/:reportId" element={<ProtectedRoute element={<RemarkPage />} />} />
  <Route path="/projectDetail/:projectId" element={<ProtectedRoute element={<ProjectDetailPage />} />} />
  <Route path="/employeeDetail/:employeeId" element={<ProtectedRoute element={<EmployeeDetailPage />} />} />
  <Route path="/employee/dashboard/:empID" element={<ProtectedRoute element={<DashboardPage_RegularEmployee />} />} />
  <Route path="/admin/dashboard/:empID" element={<ProtectedRoute element={<DashboardPage_SuperAdmin />} />} />
  <Route path="/teamLeader/dashboard/:empID" element={<ProtectedRoute element={<DashboardPage_TeamLeader />} />} />
    </Routes>
    <ToastContainer />
    </div>
  );
}

export default App;
