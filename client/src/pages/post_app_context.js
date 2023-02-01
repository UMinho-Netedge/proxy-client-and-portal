import React, { useState } from 'react';
import {useShowOutputState, useOutputTextState, useDisableClickState } from '../stateHooks';
import axios from 'axios';

export const Post_app_context = () => {

    const [outputText, setOutputText] = useOutputTextState();
    const [showOutput, setShowOutput] = useShowOutputState();
    //const [clicked, setClicked] = useDisableClickState();
    const url = "http://127.0.0.1:8080/app_contexts"

    
    const handleOutput = () => {
      setShowOutput(!showOutput);
    };
    
      // const handleClick = () => {
      //   setClicked(true);
      // };

    const handleSubmit = async event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            body: formData.get("body")
        //const data = JSON.parse(formData.get("body"));
            
    };

    try {
      const outputText = await axios.post(url, data);
      setOutputText(outputText.data);
    } catch (error) {
      console.log("error");
    }
  };

    //adicionar disabled={clicked} no button

  return (
    <form onSubmit={handleSubmit}>
      <p name="url">Sending to {url}</p>      
      <textarea type="text" name="body" placeholder="Insert the request body" />
      <button type="submit" onClick={handleOutput}>Submit</button>
      {showOutput ? ( <p>{JSON.stringify(outputText, null, 10)}</p>) : null}
    </form>
  );
}


