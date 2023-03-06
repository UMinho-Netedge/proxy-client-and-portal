import React, { useState } from 'react';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const url = `${process.env.REACT_APP_API_URL}/login`;

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(url, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success');
        document.cookie = `access_token=${data.access_token}; path=/;`;
        document.cookie = `username=${username}; path=/;`;
        window.location.href = "/"
      })
      .catch((error) => {
        console.log('Error');
      });
  };

  return (
    <div className='credentials_div'>
      <h4 className='credentials_text'>Please insert your credentials</h4>
    <form onSubmit={handleSubmit}>
      <label className='username'>
        Username:
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label className='password'>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button className='submit_login' type="submit">Submit</button>
    </form>
    </div>
  );
};

export default Login;
