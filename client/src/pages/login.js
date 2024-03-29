import React, { useState } from 'react';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [project, setProject] = useState('');
  //const project = "default_project"
  const hostname = process.env.REACT_APP_DEVICE_APP_HOSTNAME;
  const port = process.env.REACT_APP_DEVICE_APP_PORT;
  const url = `http://${hostname}:${port}/login`;
  console.log(url);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(url, {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ username, password, project }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success');

        // get refresh token
        console.debug("ACCESS:TOKEN" + data.refresh_token);
        console.debug("REFRESH_TOKEN: " + data.refresh_token);
        let expiresIn = new Date(data.expires * 1000);
        document.cookie = `access_token=${data.access_token}; expires=${expiresIn}; path=/;`;
        document.cookie = `refresh_token=${data.refresh_token}; path=/;`;
        document.cookie = `username=${username}; path=/;`;
        window.location.href = "/"        
      })
      .catch((error) => {
        document.cookie = `username=${username}; path=/;`;
        console.log('Error');
        window.location.href = "/"
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
      <label className='project'>
        Project:
        <input
          type="text"
          name="project"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />
      </label>
      <br />
      <button className='submit_login' type="submit">Submit</button>
    </form>
    </div>
  );
};

export default Login;
