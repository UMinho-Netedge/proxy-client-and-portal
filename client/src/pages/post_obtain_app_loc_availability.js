import React, { useState } from 'react';
import {useShowOutputState, useOutputTextState, useDisableClickState } from '../stateHooks';
import axios from 'axios';

export const Post_obtain_app_loc_availability = () => {

  const [responseData, setResponseData] = useState("");
  const [outputText, setOutputText] = useOutputTextState();
  const [showOutput, setShowOutput] = useShowOutputState();
  //const [clicked, setClicked] = useDisableClickState();
  const url = "http://127.0.0.1:5005/obtain_app_loc_availability"
  
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

    const config = {
      headers: {
        "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU5NjJlN2EwNTljN2Y1YzBjMGQ1NmNiYWQ1MWZlNjRjZWVjYTY3YzYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3ODY5Mjc1MDkzNzItOHFxbjNlZDBsc2RqazI5aWh2ZzlvYjBlZXJxcWlhMm4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3ODY5Mjc1MDkzNzItOHFxbjNlZDBsc2RqazI5aWh2ZzlvYjBlZXJxcWlhMm4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDk4NzU0NzExMjYzMzA5MzkzMjIiLCJlbWFpbCI6Im5ldGVkZ2Vwcm9qZWN0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiWkk2Sjd6blR1dUdlejBDdWVCSkhpdyIsImlhdCI6MTY3NjYzNjYxNiwiZXhwIjoxNjc2NjQwMjE2fQ.KrTx1LV5ibA3NHxFO6H2Z4yANtM-vocLwbnTGm8DnXeKMPbPiypilNozq3q8xsuo6mYKSC5EoMnFgrKxEMrX6b2zciMOO24ivxEbamPAWdpyZUeBUTULCAQfsECxJtrfS7P3TdJJCQxruqjEcwtlkIpRHta_QFPG4nPpo5-4NbjaZ_qbQXEsqxkF-IJS1oJp7hv8WrT-a6J9lcISsqQNI1GAst0lKXxIal4Kj8fH4dVIUx1Gfm6GH3wdjvN6xPlysri-Ii8BDTyEoUDN8LwYQanRXUqEv3bKQ1OhF2MMTxcTcFfYvMsBfSSLKr_DLriSAThXL7azcSC6rReVqvDbvw"
      }
    };

    const outputText = await axios.post(url, data, config);
    setResponseData(JSON.stringify(outputText.data["body"]));
    setOutputText(outputText.data["status"]);
  };

    //adicionar disabled={clicked} no button

  return (
    <div className="post">
    <h2>Post App Location Availability</h2>
    <form onSubmit={handleSubmit}>
      <p name="url">Sending to http://127.0.0.1:8080/obtain_app_loc_availability</p>    
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