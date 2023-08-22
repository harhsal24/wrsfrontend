import React from 'react';
import './HomePage.css'; 
import { useNavigate } from 'react-router-dom';
  

const HomePage = () => {   
   const navigate =useNavigate(); 

  const handleLoginClick= ()=>{ 
  navigate("/login");
  };   

  const handleRegisterClick=() =>{
     navigate("/register");
  };
  return (
   <>   
        <div className="container">
        <h2 className="h">Weekly Report Submission</h2>  
        <div className='login'>
        <button className="login1" onClick={handleLoginClick}>
           Login 
        </button>
        <button className="register1" onClick={handleRegisterClick}>
           Registration 
        </button>
        
        </div>
        </div>
    
    </>
  );
};

export default HomePage;
