import React from 'react';
import { AuthService } from './AuthService';

function App() {
  const handleLogout = () => {
    AuthService.clearTokens();
  };

  return (
    <div>
      {AuthService.isLoggedIn() ? (
        <div>
          <p>User is logged in!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>User is not logged in.</p>
      )}
    </div>
  );
}

export default App;
