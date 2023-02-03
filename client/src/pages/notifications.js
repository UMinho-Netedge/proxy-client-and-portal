import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Notifications = () => {
    const [outputText, setOutputText] = useState("");
    const [responseData, setResponseData] = useState("");
    const url = 'http://127.0.0.1:5005/callback_ref'

    useEffect(() => {
        axios.get(url)
            .then(response => {
            setOutputText(response.status);
            setResponseData(response.data);
            })
            .catch(error => {
            setOutputText(error.response.status);
            setResponseData(JSON.stringify(error.response.data));
            });
        }, []);

    return (
    <div>
        <p>Response status: {outputText}</p>
        <h4>Body</h4>
        <textarea value={responseData} readOnly />
    </div>
    );
};

export default Notifications;