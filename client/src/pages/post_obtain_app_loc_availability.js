import React, { useState } from 'react';
import {useShowOutputState, useOutputTextState, useDisableClickState } from '../stateHooks';
import axios from 'axios';

export const Post_obtain_app_loc_availability = () => {

  const [responseData, setResponseData] = useState("");
  const [outputText, setOutputText] = useOutputTextState();
  const [showOutput, setShowOutput] = useShowOutputState();
  //const [clicked, setClicked] = useDisableClickState();
  const url = "http://127.0.0.1:8080/obtain_app_loc_availability"
  
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
      const outputText = await axios.post(url, data);
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
