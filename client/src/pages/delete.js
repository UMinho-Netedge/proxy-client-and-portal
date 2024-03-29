import React, { useState } from 'react';
import { useOutputTextState, useShowOutputState } from '../stateHooks';
import axios from 'axios';
import { useCookies } from 'react-cookie';
var myCookies = require('./cookie.js');

export const Delete = () => {

    myCookies.checkAccessToken();   
  
    const [isLoading, setIsLoading] = useState(false); // new loading state
    const [responseData, setResponseData] = useState("");
    const [outputText, setOutputText] = useOutputTextState();
    const [showOutput, setShowOutput] = useShowOutputState();
    const [input, setInput] = useState("");
    const [cookies] = useCookies(['access_token']);
    const access_token = cookies.access_token;
    const url = `http://${process.env.REACT_APP_DEVICE_APP_HOSTNAME}:${process.env.REACT_APP_DEVICE_APP_PORT}`;
    

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
            'Authorization': 'Bearer ' + access_token
          }
        };

        /*
        const outputText = await axios.delete(`${url}/app_contexts/${input}`, config);
        console.log("OUTPUT TEXT ALL: ", outputText);
        setResponseData(JSON.stringify(outputText.data, null, 2))
        console.log("OUTPUT TEXT: ", outputText.data);
        console.log("RESPONDED DATA: ", responseData);
        setOutputText(outputText.status);
        */
        
        setIsLoading(true); // set loading state to true before making the request

        axios.delete(`${url}/app_contexts/${input}`, config)
        .then(response => {
          //console.info("RESPONSE: ", response);
          setResponseData(JSON.stringify(response.data, null, 2));
          //console.info("RESPONDED DATA: ", responseData);
          setOutputText(response.status);
        })
        .catch(error => {
          //console.info("ERROR: ", error);
          setResponseData(JSON.stringify(error.response.data, null, 2));
          //console.info("RESPONDED DATA: ", responseData);
          setOutputText(error.response.status);
        })
        .finally(() => {
          setIsLoading(false); // set loading state to false after the request is completed
        })

    };

    return (
      <div className="delete">
      <h2>Delete App Context</h2>
      {isLoading && <div className="spinner"></div>} {/* Render spinner when loading */}
        <form onSubmit={handleDelete}>
          <p name="url">Sending to {url}/app_contexts/{input}</p>  
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
