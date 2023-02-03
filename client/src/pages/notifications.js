import axios from 'axios';
import React, { useState, useEffect } from 'react';

export const Notifications = () => {

    const [description, setDescription] = useState("Description");
    const [status, setStatus] = useState("Status");

    useEffect(() => {
        axios.post('http://127.0.0.1:5005/callback_ref', {
            data: 'Example Data'
        })
        .then(response => {
          setStatus(response.status);
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

    return (
        <div>
            <p>Response status: {status}</p>
            <h4>Body</h4>
            <textarea value={description} readOnly />
        </div>
    )
}