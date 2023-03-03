import React, { useState } from 'react';
import { useOutputTextState, useShowOutputState } from '../stateHooks';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export const Put = () => {
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

    const handleSubmit = async event => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const data = JSON.parse(formData.get("body"));
      
      const config = {
        headers: {
          "access_token": access_token
        }
      };

      const outputText = await axios.put(`http://127.0.0.1:5005/app_contexts/${input}`, data, config);
      setResponseData(JSON.stringify(outputText.data["body"]))
      setOutputText(outputText.data["status"]);
  };

    return (
      <div className="put">
      <h2>Put App Context</h2>
        <form onSubmit={handleSubmit}>
          <p name="url">Sending to http://127.0.0.1:8080/app_contexts/{input}</p>  
          <div className="column">
          <h4>Parameter</h4>
            <input placeholder="contextId" name="contextId" type="text" value={input} onChange={handleChange}/>    
          </div>
          <h4>Request Body</h4>
          <textarea type="text" name="body" placeholder="Insert the request body" />
          <div className="column">
            <button className='button_put' type="submit" onClick={handleOutput}>Submit</button>
            <div className='sub_put'>
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
