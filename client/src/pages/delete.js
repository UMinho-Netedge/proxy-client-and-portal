import React, { useState } from 'react';
import { useOutputTextState, useShowOutputState } from '../stateHooks';
import axios from 'axios';
import { useCookies } from 'react-cookie';
var myCookies = require('cookie.js');

export const Delete = () => {

    myCookies.checkAccessToken();   
  
    const [responseData, setResponseData] = useState("");
    const [outputText, setOutputText] = useOutputTextState();
    const [showOutput, setShowOutput] = useShowOutputState();
    const [input, setInput] = useState("");
    const [cookies] = useCookies(['access_token']);
    const access_token = cookies.access_token;
    

    const handleChange = event => {
        setInput(event.target.value.trim());
        };

    function handleOutput() {
        setShowOutput(!showOutput);
        }

        const handleDelete = async event => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const config = {
          headers: {
            "access_token": access_token
          }
        };

        const outputText = await axios.delete(`${process.env.REACT_APP_REQUESTS}/app_contexts/${input}`, config);
        setResponseData(JSON.stringify(outputText.data["body"]))
        setOutputText(outputText.data["status"]);
    };

    return (
      <div className="delete">
      <h2>Delete App Context</h2>
        <form onSubmit={handleDelete}>
          <p name="url">Sending to http://127.0.0.1:8080/app_contexts/{input}</p>  
          <div className="column">
          <h4>Parameter</h4>
            <input placeholder="contextId" name="contextId" type="text" value={input} onChange={handleChange}/>    
          </div>
          <div className="column">
            <button className='button_delete' type="submit" onClick={handleOutput}>Submit</button>
            <div className='sub_delete'>
            <h4>Status</h4>
            <p>Response status: {outputText}</p>
            <h4>Body</h4>
            <textarea value={responseData} readOnly />
            </div>
          </div>
        </form>
        </div>
      );
};
