import React, { useState } from 'react';
import {useShowOutputState } from '../stateHooks';
import axios from 'axios';

export const Post_app_context = () => {

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
      const response = await axios.post("http://127.0.0.1:8080/app_contexts", data);
      setResponse(response.data);
    } catch (error) {
      setError(error);
    }
  };

  if (error) return <div>An error occurred: {error.message}</div>;
  if (response) return <pre>{JSON.stringify(response, null, 2)}</pre>;

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="body" placeholder="http://127.0.0.1:5001/app_contexts" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Post_app_context;



