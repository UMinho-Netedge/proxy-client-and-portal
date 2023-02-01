import React, { useState } from 'react';
import { useOutputTextState, useShowOutputState } from '../stateHooks';
import axios from 'axios';

export const Put = () => {

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
        const data = {
            body: formData.get("body"),
            contextId: formData.get("contextId")
    };

    try {
      const outputText = await axios.put(`http://127.0.0.1:8080/app_contexts/${input}`, data);
      setOutputText(outputText.data);
    } catch (error) {
      console.log("error");
    }
  };


    return (
        <form onSubmit={handleSubmit}>
          <p name="url">Sending to http://127.0.0.1:8080/app_contexts/{input}</p>  
          <input placeholder="contextId" name="contextId" type="text" value={input} onChange={handleChange}/>    
          <textarea type="text" name="body" placeholder="Insert the request body" />
          <button type="submit" onClick={handleOutput}>Submit</button>
          {showOutput ? ( <p>{JSON.stringify(outputText, null, 10)}</p>) : null}
        </form>
      );
};
