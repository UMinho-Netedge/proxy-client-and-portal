import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { LogoutConfirmation } from './pages/logout_confirmation';

export const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'username']);
  const username = cookies.username;

  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

  const handleLogout = () => {
    showLogoutDialog();
    removeCookie('access_token');
    removeCookie('username');
    window.location.href = "/"

  };

  const showLogoutDialog = () => {
    setShowLogoutConfirmation(true);
  };

  const hideLogoutDialog = () => {
    setShowLogoutConfirmation(false);
  };

  return (
    <nav>
      <div className='navbar'>
        <Link to='/'>
          <img
            src={require('./images/logo_purple.png')}
            alt="Logo"
            className='logo'
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          />
        </Link>
        <div className='links'>
          <Link className='get_link' to="/get"> GET APP LIST </Link>
          <Link className='post_link' to="/post_app_context"> POST APP CONTEXT </Link>
          <Link className='put_link' to="/put"> PUT APP CONTEXT </Link>
          <Link className='delete_link' to="/delete"> DELETE APP CONTEXT </Link>
          <Link className='post_link' to="/post_obtain_app_loc_availability"> POST OBTAIN APP LOCATION AVAILABILITY </Link>
          <Link className='notifications_link' to="/notifications"> NOTIFICATIONS </Link>
        </div>
        <div className="button-container">
          {username ? (
            <button className="login-button" onClick={showLogoutDialog}>
              <span>Logout</span>
            </button>
          ) : (
            <Link to="/login">
              <button className="login-button">
                <span>Login</span>
              </button>
            </Link>
          )}
        </div>
      </div>
      {showLogoutConfirmation && (
        <LogoutConfirmation handleLogout={handleLogout} cancelLogout={hideLogoutDialog} />
      )}
    </nav>
  );
};

export default Navbar;
