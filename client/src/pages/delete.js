import React, { useState } from 'react';
import { useOutputTextState, useShowOutputState } from '../stateHooks';
import axios from 'axios';

export const Delete = () => {
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

        const handleDelete = async event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {contextId: formData.get("contextId")};

    try {
        const outputText = await axios.delete(`http://127.0.0.1:8080/app_contexts/${input}`, data);
        setOutputText(outputText.status);
    } catch (error) {
        setResponseData(JSON.stringify(error.response.data));
        setOutputText(error.response.status)    
    }
    };

    return (
        <form onSubmit={handleDelete}>
          <p name="url">Sending to http://127.0.0.1:8080/app_contexts/{input}</p>  
          <div className="column">
            <input placeholder="contextId" name="contextId" type="text" value={input} onChange={handleChange}/>    
          </div>
          <div className="column">
            <button type="submit" onClick={handleOutput}>Submit</button>
            <p>Response status: {outputText}</p>
            <h4>Body</h4>
            <textarea value={responseData} readOnly />
          </div>
        </form>
      );
};
