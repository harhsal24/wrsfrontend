import React from 'react';
import { useNavigate } from 'react-router-dom';

function Success() {
  const myStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '25vh', // Makes the container take the full viewport height
    padding: '10px',
  };

  const messageStyle = {
    color: 'green',
  };    
  
  const login1 = {  
    display:'flex',
    height:'5vh',
    justifyContent: 'center',
    alignItems: 'center',
  };   

  const login = {
     backgroundColor:'green' ,
     color: 'white',
     padding: '10px',
    border: 'none',
    borderRadius: '4px',
    magin:'5px',
    cursor:'pointer',
  };

  const navigate=useNavigate();

  const handleLoginClick=()=>{
     navigate("/login");
  };

  return ( 
    <>
    <div style={myStyle}>
      <h2 style={messageStyle}>Registration Successful</h2>     
    </div>    
    <div style={login1}>
    <button style={login} onClick={handleLoginClick}>
           Login 
        </button>
    </div>  
    </>
  );
}

export default Success;
