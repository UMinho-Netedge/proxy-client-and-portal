import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Notifications = () => {
    const [outputText, setOutputText] = useState("");
    const [responseData, setResponseData] = useState("");
    const [responseTime, setResponseTime] = useState("");
    const [responseContextId, setResponseContextId] = useState("");
    const url = `${process.env.REACT_APP_API_URL}/notifications`

    useEffect(() => {
        axios.get(url)
            .then(response => {
            setOutputText(response.data[0]["status"]);
            setResponseData(JSON.stringify(response.data[0]["body"]));
            setResponseTime(response.data[0]["time"])
            setResponseContextId(response.data[1])
            });
        }, []);

    return (
    <div>
        <div className="notifications">
        <h2>Last Notification</h2>
        <h4>Status</h4>
        <p>Response status: {outputText}</p>
        <h4>Body</h4>
        <textarea value={responseData} readOnly />
        <h4>Time</h4>
        <p>Time: {responseTime}</p>
        <h4>ContextId already created </h4>
        <textarea value={responseContextId} readOnly />
        </div>
    </div>
    );
};

export default Notifications;
