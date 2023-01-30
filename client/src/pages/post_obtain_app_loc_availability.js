import React, { useState } from 'react';
import { useOutputTextState, useShowOutputState } from '../stateHooks';
import axios from 'axios';

export const Post_obtain_app_loc_availability = () => {

    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [showOutput, setShowOutput] = useShowOutputState();

    
    function handleOutput() {
        setShowOutput(!showOutput);
      }

    const handleSubmit = async event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = {
            body: formData.get("body")
    };

    try {
      const response = await axios.post("http://127.0.0.1:5001/application_location_availability", data);
      setResponse(response.data);
    } catch (error) {
      setError(error);
    }
  };

  if (error) return <div>An error occurred: {error.message}</div>;
  if (response) return <pre>{JSON.stringify(response, null, 2)}</pre>;

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="body" placeholder="http://127.0.0.1:5001/application_location_availability" />
      <button type="submit">Submit</button>
    </form>
  );
}



    // return (
    //     <div>
    //         <input className="url" placeholder="http://127.0.0.1:8080/obtain_app_loc_availability" type="text"/>            
    //         <div className="request_body">
    //             <textarea id="textarea" placeholder="Request Body" type="text"  />
    //         </div>
    //         <button onClick={handleOutput}> Submit </button>
    //         {showOutput ? (
    //         <p>{outputText}</p>) : null}
    //     </div>
    // )
