import React, { useState } from 'react';
import { useOutputTextState, useShowOutputState } from '../stateHooks';
import axios from 'axios';

export const Put = () => {
  const [responseData, setResponseData] = useState("");
  const [outputText, setOutputText] = useOutputTextState();
  const [showOutput, setShowOutput] = useShowOutputState();
  const [input, setInput] = useState("");

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

    try {
      const outputText = await axios.put(`http://127.0.0.1:8080/app_contexts/${input}`, data);
      setOutputText(outputText.status);
    } catch (error) {
      setResponseData(JSON.stringify(error.response.data));
      setOutputText(error.response.status)
    }
  };

    return (
        <form onSubmit={handleSubmit}>
          <p name="url">Sending to http://127.0.0.1:8080/app_contexts/{input}</p>  
          <div className="column">
            <input placeholder="contextId" name="contextId" type="text" value={input} onChange={handleChange}/>    
          </div>
          <textarea type="text" name="body" placeholder="Insert the request body" />
          <div className="column">
            <button type="submit" onClick={handleOutput}>Submit</button>
            <p>Response status: {outputText}</p>
            <h4>Body</h4>
            <textarea value={responseData} readOnly />
          </div>
        </form>
      );
};
