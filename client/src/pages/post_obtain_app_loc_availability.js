import React, { useState } from 'react';
import {useShowOutputState, useOutputTextState} from '../stateHooks';
import axios from 'axios';
import { useCookies } from 'react-cookie';
var myCookies = require('./cookie.js');

export const Post_obtain_app_loc_availability = () => {

  myCookies.checkAccessToken();

  const [responseData, setResponseData] = useState("");
  const [outputText, setOutputText] = useOutputTextState();
  const [showOutput, setShowOutput] = useShowOutputState();
  const url = `${process.env.REACT_APP_REQUESTS}/obtain_app_loc_availability`
  const [cookies] = useCookies(['access_token']);
  const access_token = cookies.access_token;
  
  const handleOutput = () => {
    setShowOutput(!showOutput);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = JSON.parse(formData.get("body"));

    const config = {
      headers: {
        'Authorization': 'Bearer ' + access_token
      }
    };

    const outputText = await axios.post(url, data, config);
    setResponseData(JSON.stringify(outputText.data["body"]));
    setOutputText(outputText.data["status"]);
  };

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
