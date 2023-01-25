import { useState } from 'react';
import { useOutputTextState, useShowOutputState } from '../stateHooks';

export const Put = () => {

    const [outputText, setOutputText] = useOutputTextState();
    const [showOutput, setShowOutput] = useShowOutputState();

    function handleOutput() {
        setShowOutput(!showOutput);
      }

    return (
        <div>
            <input className="url" placeholder="http://127.0.0.1:8080/app_contexts/{contextId}" type="text"/>            
            <div className="parameters">
                <div className="column">
                    <input placeholder="contextId" type="text"/>
                </div>
            </div>
                <div className="request_body">
                <textarea id="textarea" placeholder="Request Body" type="text"  />
            </div>
            <button onClick={handleOutput}> Submit </button>
            {showOutput ? (
            <p>{outputText}</p>) : null}
        </div>
    )
}