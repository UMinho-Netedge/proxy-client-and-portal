import React, { useState } from 'react';
import {useShowOutputState, useOutputTextState} from '../stateHooks';
import axios from 'axios';
import { useCookies } from 'react-cookie';
var myCookies = require('./cookie.js');

export const Post_app_context = () => {

  myCookies.checkAccessToken();

  const [responseData, setResponseData] = useState("");
  const [outputText, setOutputText] = useOutputTextState();
  const [showOutput, setShowOutput] = useShowOutputState();
  const url = `${process.env.REACT_APP_REQUESTS}/app_contexts`

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

    console.log("OUTPUT TEXT ALL: ", outputText);

    setResponseData(JSON.stringify(outputText.data));
    console.log("OUTPUT TEXT: ", outputText.data);
    console.log("RESPONDED DATA: ", responseData);
    setOutputText(outputText.status);
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

