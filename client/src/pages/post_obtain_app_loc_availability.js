import React, { useState } from 'react';
import { useOutputTextState, useShowOutputState } from '../stateHooks';

export const Post_obtain_app_loc_availability = () => {

    const [outputText, setOutputText] = useOutputTextState();
    const [showOutput, setShowOutput] = useShowOutputState();

    function handleOutput() {
        setShowOutput(!showOutput);
      }

    return (
        <div>
            <input className="url" placeholder="http://127.0.0.1:8080/obtain_app_loc_availability" type="text"/>            
            <div className="request_body">
                <textarea id="textarea" placeholder="Request Body" type="text"  />
            </div>
            <button onClick={handleOutput}> Submit </button>
            {showOutput ? (
            <p>{outputText}</p>) : null}
        </div>
    )
}