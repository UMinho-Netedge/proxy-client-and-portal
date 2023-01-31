import React, { useState } from 'react';
import { useOutputTextState, useShowOutputState } from '../stateHooks';
import axios from 'axios';

export const Put = () => {

    const [outputText, setOutputText] = useOutputTextState();
    const [showOutput, setShowOutput] = useShowOutputState();
    const [input, setInput] = useState("");
    const url = "http://127.0.0.1:5001//app_contexts/${input}"

    const handleChange = event => {
        setInput(event.target.value);
      };

    function handleOutput() {
        setShowOutput(!showOutput);
      }

      const handleSubmit = async event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            body: formData.get("body"),
            contextId: formData.get("contextId")
    };

    try {
      const outputText = await axios.post(url, data);
      setOutputText(outputText.data);
    } catch (error) {
      console.log("error");
    }
  };


    return (
        <form onSubmit={handleSubmit}>
          <p name="url">Sending to {url}</p>  
          <input placeholder="contextId" name="contextId" type="text" value={input} onChange={handleChange}/>    
          <textarea type="text" name="body" placeholder="Insert the request body" />
          <button type="submit" onClick={handleOutput}>Submit</button>
          {showOutput ? ( <p>{JSON.stringify(outputText, null, 10)}</p>) : null}
        </form>
      );
}