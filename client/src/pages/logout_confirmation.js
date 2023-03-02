import React from 'react';

export const LogoutConfirmation = ({ handleLogout, cancelLogout }) => {
  return (
    <div className="logout-confirmation">
      <p className='logout_message'>Are you sure you want to log out?</p>
      <button className="logout-confirm" onClick={handleLogout}>Yes</button>
      <button className="logout-cancel" onClick={cancelLogout}>No</button>
    </div>
  );
};

export default LogoutConfirmation;
