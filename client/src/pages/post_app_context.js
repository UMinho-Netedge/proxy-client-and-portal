import React, { useState } from 'react';
import {useShowOutputState, useOutputTextState} from '../stateHooks';
import axios from 'axios';

export const Post_app_context = () => {

  const [responseData, setResponseData] = useState("");
  const [outputText, setOutputText] = useOutputTextState();
  const [showOutput, setShowOutput] = useShowOutputState();
  const url = "http://127.0.0.1:5005/app_contexts"

  const handleOutput = () => {
    setShowOutput(!showOutput);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = JSON.parse(formData.get("body"));

    const config = {
      headers: {
        "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU5NjJlN2EwNTljN2Y1YzBjMGQ1NmNiYWQ1MWZlNjRjZWVjYTY3YzYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3ODY5Mjc1MDkzNzItOHFxbjNlZDBsc2RqazI5aWh2ZzlvYjBlZXJxcWlhMm4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3ODY5Mjc1MDkzNzItOHFxbjNlZDBsc2RqazI5aWh2ZzlvYjBlZXJxcWlhMm4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDk4NzU0NzExMjYzMzA5MzkzMjIiLCJlbWFpbCI6Im5ldGVkZ2Vwcm9qZWN0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiVDFVOG1LN3pSMGRMUWpUMU03WVpwZyIsImlhdCI6MTY3NjYzMjI3MiwiZXhwIjoxNjc2NjM1ODcyfQ.ji4U6czsNa_ha4XiCR7mRGi1QHWWp5YIUuMpsGdWf1_pQT6fct9nqll7d7NnF1qKy_TV8FwpcRIIo0ibQwcIQDr1lNw2dg_vQzSCCWl4Mv3pjHA669Yv_tYtXVKtSHv1MxF5KV7GqBMNKK6Q_y4i-jZ_yBJfq1E-UMlSFyzUSmfB0IfMOO4Rexp7AfL8drwfhgu4Nhep3vyfGwd5tWogfwtElZec2O7oqjbVqoZNJ8e4_7qxBfNBB5_WeYNBmufJ4sCP7Y1KsPAweMx1-_bRAmd6DMT7_hhglVuc3_LwsdfzYG6ecbtx7vKZe_c38PVhsV3yDNTn9WXEJ3CNiWJ0QQ"
      }
    };

    const outputText = await axios.post(url, data, config);

    setResponseData(JSON.stringify(outputText.data["body"]));
    setOutputText(outputText.data["status"]);
  };


  return (
    <div className="post">
      <h2>Post App Context</h2>
      <form onSubmit={handleSubmit}>
        <p className="url">Sending to http://127.0.0.1:8080/app_contexts</p>   
        <h4>Request Body</h4>   
        <textarea type="text" name="body" placeholder="Insert the request body" />
        <div className="column">
        <button className='button_post' type="submit" onClick={handleOutput}>Submit</button>
        <div className='sub_post'>
        <h4>Status</h4>
        <p>Response status: {outputText}</p>
        <h4>Body</h4>
        <textarea value={responseData} readOnly />
        </div>
        </div>
      </form>
    </div>
  );
}


