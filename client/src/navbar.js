import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export const Navbar = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'username']);
  const username = cookies.username;

  const handleLogout = () => {
    removeCookie('access_token');
    removeCookie('username');
  }

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
          <Link to="/login">
            {username ?
              <button className="login-button" onClick={handleLogout}>
                <span>{username}</span>
              </button>
              :
              <button className="login-button">
                <span>Login</span>
              </button>
            }
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
