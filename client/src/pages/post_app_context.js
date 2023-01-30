import React, { useState } from 'react';
import {useShowOutputState } from '../stateHooks';
import axios from 'axios';

export const Post_app_context = () => {

    const [showOutput, setShowOutput] = useShowOutputState();
    const [inputValue, setInputValue] = useState("");

    function handleOutput() {
        setShowOutput(!showOutput);
      }

    function handleSubmit() {
            axios.post("http://127.0.0.1:5001/app_contexts", {
            body: JSON.stringify(inputValue)
            })
            .then(function (response) {
                setInputValue(response.data);
              })
              .catch(function (error) {
                console.log(error);
              });
        }



    return (
        <div>
            <input className="url" placeholder="http://127.0.0.1:5001/app_contexts" type="text"/>        
                <div className="request_body">
                    <textarea id="textarea" placeholder="Request Body"
                        type="text" value={inputValue}/>
                </div>
                <button type="submit" onClick={() => {handleOutput(); handleSubmit()}}> Submit </button>
                {showOutput ? ( inputValue && <p>{JSON.stringify(inputValue)}</p>) : null}
        </div>
    )
}