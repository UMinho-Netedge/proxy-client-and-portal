import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export const Navbar = () => {
  const [accessToken, setAccessToken] = useState("");
  const [error, setError] = useState(null);
  const [cookies, setCookie] = useCookies(['access_token']);

  const openLogin = () => {
    window.open('http://localhost:5000/login', '_blank', 'noreferrer');
  };
  
  const handleClick = () => {
    try {
      const response = fetch('http://localhost:5000/login')
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      })
      .catch(function () {
        console.log('Booo');
      });
      console.log(response.json())
      const data = response.data;
      setAccessToken(data["access_token"]);
      setCookie('access_token', data["access_token"], { path: '/' });
      setError(null);
    } catch (err) {
      setAccessToken("");
      setCookie('access_token', '', { path: '/' });
      setError("Failed to get access token.");
    }
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
          <button className="text-image-button" onClick={() => { handleClick(); openLogin() }}>
            <img src={'./google-logo.png'} alt="GoogleLogo"/>
            <span>Login</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
