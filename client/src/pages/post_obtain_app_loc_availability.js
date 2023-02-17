import React, { useState } from 'react';
import {useShowOutputState, useOutputTextState, useDisableClickState } from '../stateHooks';
import axios from 'axios';

export const Post_obtain_app_loc_availability = () => {

  const [responseData, setResponseData] = useState("");
  const [outputText, setOutputText] = useOutputTextState();
  const [showOutput, setShowOutput] = useShowOutputState();
  //const [clicked, setClicked] = useDisableClickState();
  const url = "http://127.0.0.1:8080/obtain_app_loc_availability"
  const headers = {
    'id_token': 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU5NjJlN2EwNTljN2Y1YzBjMGQ1NmNiYWQ1MWZlNjRjZWVjYTY3YzYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3ODY5Mjc1MDkzNzItOHFxbjNlZDBsc2RqazI5aWh2ZzlvYjBlZXJxcWlhMm4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3ODY5Mjc1MDkzNzItOHFxbjNlZDBsc2RqazI5aWh2ZzlvYjBlZXJxcWlhMm4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDk4NzU0NzExMjYzMzA5MzkzMjIiLCJlbWFpbCI6Im5ldGVkZ2Vwcm9qZWN0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiRkQ3RERwSEJjTHhTQnRHWDlhdzhfUSIsImlhdCI6MTY3NjYyNzg3OSwiZXhwIjoxNjc2NjMxNDc5fQ.CXIZZA3pwqu25YErKeXs7XolrV-4zHKj5NMWd-HWsVnpC2HgLqoqt3RFcAULN3UEP6i5-IjBtOm17gjNM99Urev-OXlEesdgls5GGNqZJSzYH67-ecazru3HbQigQvPvzq_R2LLPK4OPODbQ6i44JakdByPFSxPmxLagI6uQGv-sH-YTc1H7oNgvjjG7_lkYHSs6v8G2K0KibJ_-1DQ7rexlf3WPtpcV5UUFtLO9oaxiwvFnOK74zZsYJgLpDFkiIr29HrVH9Cmnq5KQLb0sY4yiz-lnYSGuT7RvBFqsIPq6C8AhZLgQgDBMiFGajC2x6xcHL7SRRV6kQsJ9JZBq3g'
  };
  
  const handleOutput = () => {
    setShowOutput(!showOutput);
  };
  
    // const handleClick = () => {
    //   setClicked(true);
    // };

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = JSON.parse(formData.get("body"));

    try {
      const outputText = await axios.post(url, data, headers);
      setResponseData(JSON.stringify(outputText.data));
      setOutputText(outputText.status);
    } catch (error) {
      setResponseData(JSON.stringify(error.response.data));
      setOutputText(error.response.status)
    }
  };

    //adicionar disabled={clicked} no button

  return (
    <div className="post">
    <h2>Post App Location Availability</h2>
    <form onSubmit={handleSubmit}>
      <p name="url">Sending to {url}</p>    
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
