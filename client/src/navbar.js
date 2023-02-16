import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

export const Navbar = () => {

  const [OutputText, setOutputText] = useState("");
  const url = "http://127.0.0.1:5005/login"; 

  function handleOutput() {
    axios.get(url)
      .then(response => {
        setOutputText(response.status);
      })
      .catch(error => {
        setOutputText(error.response.status);
      });
  }

  
  const handleClick = () => {
    window.open('http://localhost:5000/login', '_blank', 'noreferrer');
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
        <button className="text-image-button" onClick={() => { handleClick(); handleOutput() }}>
          <img src={'./google-logo.png'} alt="GoogleLogo"/>
          <span>Login</span>
        </button>
      </div>
      </div>
    </nav>
  );
}