import axios from 'axios';
import { useCookies } from 'react-cookie';
import React, { useState } from 'react';

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(`${name}=`)) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
}


export function checkAccessToken() {
    const url = `${process.env.REACT_APP_API_URL}/refresh`;
    const accessToken = getCookie('access_token');
    const refreshToken = getCookie('refresh_token');
  
    // If the access token has expired
    if (!accessToken) {
      // Send a request to the server to get a new access token using the refresh token
      fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${refreshToken}`
        }
      })
      .then(response => response.json()) // receive the new access token
      .then(data => {
        // Update the access token cookie with the new access token and expiration time
        document.cookie = `access_token=${data.access_token}; expires=${data.expires}; path=/;`;
      })
      .catch(error => {
        console.error('Error refreshing access token:', error);
      });
    }
  }
  
