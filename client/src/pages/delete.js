import React, { useState } from 'react';
import { useOutputTextState, useShowOutputState } from '../stateHooks';
import axios from 'axios';

export const Delete = () => {
    const [responseData, setResponseData] = useState("");
    const [outputText, setOutputText] = useOutputTextState();
    const [showOutput, setShowOutput] = useShowOutputState();
    const [input, setInput] = useState("");
    const headers = {
      'id_token': 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU5NjJlN2EwNTljN2Y1YzBjMGQ1NmNiYWQ1MWZlNjRjZWVjYTY3YzYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3ODY5Mjc1MDkzNzItOHFxbjNlZDBsc2RqazI5aWh2ZzlvYjBlZXJxcWlhMm4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3ODY5Mjc1MDkzNzItOHFxbjNlZDBsc2RqazI5aWh2ZzlvYjBlZXJxcWlhMm4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDk4NzU0NzExMjYzMzA5MzkzMjIiLCJlbWFpbCI6Im5ldGVkZ2Vwcm9qZWN0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiRkQ3RERwSEJjTHhTQnRHWDlhdzhfUSIsImlhdCI6MTY3NjYyNzg3OSwiZXhwIjoxNjc2NjMxNDc5fQ.CXIZZA3pwqu25YErKeXs7XolrV-4zHKj5NMWd-HWsVnpC2HgLqoqt3RFcAULN3UEP6i5-IjBtOm17gjNM99Urev-OXlEesdgls5GGNqZJSzYH67-ecazru3HbQigQvPvzq_R2LLPK4OPODbQ6i44JakdByPFSxPmxLagI6uQGv-sH-YTc1H7oNgvjjG7_lkYHSs6v8G2K0KibJ_-1DQ7rexlf3WPtpcV5UUFtLO9oaxiwvFnOK74zZsYJgLpDFkiIr29HrVH9Cmnq5KQLb0sY4yiz-lnYSGuT7RvBFqsIPq6C8AhZLgQgDBMiFGajC2x6xcHL7SRRV6kQsJ9JZBq3g'
    };
    

    const handleChange = event => {
        setInput(event.target.value.trim());
        };

    function handleOutput() {
        setShowOutput(!showOutput);
        }

        const handleDelete = async event => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const config = {
          headers: {
            "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU5NjJlN2EwNTljN2Y1YzBjMGQ1NmNiYWQ1MWZlNjRjZWVjYTY3YzYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3ODY5Mjc1MDkzNzItOHFxbjNlZDBsc2RqazI5aWh2ZzlvYjBlZXJxcWlhMm4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3ODY5Mjc1MDkzNzItOHFxbjNlZDBsc2RqazI5aWh2ZzlvYjBlZXJxcWlhMm4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDk4NzU0NzExMjYzMzA5MzkzMjIiLCJlbWFpbCI6Im5ldGVkZ2Vwcm9qZWN0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiVDFVOG1LN3pSMGRMUWpUMU03WVpwZyIsImlhdCI6MTY3NjYzMjI3MiwiZXhwIjoxNjc2NjM1ODcyfQ.ji4U6czsNa_ha4XiCR7mRGi1QHWWp5YIUuMpsGdWf1_pQT6fct9nqll7d7NnF1qKy_TV8FwpcRIIo0ibQwcIQDr1lNw2dg_vQzSCCWl4Mv3pjHA669Yv_tYtXVKtSHv1MxF5KV7GqBMNKK6Q_y4i-jZ_yBJfq1E-UMlSFyzUSmfB0IfMOO4Rexp7AfL8drwfhgu4Nhep3vyfGwd5tWogfwtElZec2O7oqjbVqoZNJ8e4_7qxBfNBB5_WeYNBmufJ4sCP7Y1KsPAweMx1-_bRAmd6DMT7_hhglVuc3_LwsdfzYG6ecbtx7vKZe_c38PVhsV3yDNTn9WXEJ3CNiWJ0QQ"
          }
        };

        const outputText = await axios.delete(`http://127.0.0.1:5005/app_contexts/${input}`, config);
        setResponseData(JSON.stringify(outputText.data["body"]))
        setOutputText(outputText.data["status"]);
    };

    return (
      <div className="delete">
      <h2>Delete App Context</h2>
        <form onSubmit={handleDelete}>
          <p name="url">Sending to http://127.0.0.1:8080/app_contexts/{input}</p>  
          <div className="column">
          <h4>Parameter</h4>
            <input placeholder="contextId" name="contextId" type="text" value={input} onChange={handleChange}/>    
          </div>
          <div className="column">
            <button className='button_delete' type="submit" onClick={handleOutput}>Submit</button>
            <div className='sub_delete'>
            <h4>Status</h4>
            <p>Response status: {outputText}</p>
            <h4>Body</h4>
            <textarea value={responseData} readOnly />
            </div>
          </div>
        </form>
        </div>
      );
};
