// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { validateToken, extractRolesFromToken } from './path-to-your/UserAuthenticationProvider';

// const AutoLoginRedirect = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const accessToken = localStorage.getItem('accessToken');
//     if (accessToken) {
//       if (validateToken(accessToken)) {
//         const roles = extractRolesFromToken(accessToken);
        
//         if (roles.includes('SUPER_ADMIN')) {
//           navigate('/admin/dashboard');
//         } else if (roles.includes('TEAM_LEADER')) {
//           navigate('/teamLeader/dashboard');
//         } else if (roles.includes('REGULAR_EMPLOYEE')) {
//           navigate('/employee/dashboard');
//         } else {
//           // Handle unknown role
//           navigate('/login'); // Redirect to login if role is not recognized
//         }
//       } else {
//         // Invalid token, redirect to login
//         navigate('/login');
//       }
//     } else {
//       // No token found, redirect to login
//       navigate('/login');
//     }
//   }, []);

//   return null; // This component doesn't render anything
// };

// export default AutoLoginRedirect;
