import React, { useState } from 'react';

export const Notifications = () => {

    const [errorType, setErrorType] = useState("Error Type");
    const [description, setDescription] = useState("Description");
    const [body, setBody] = useState("Body");

    return (
        <div>
            <p>{errorType}</p>
            <p>{description}</p>
            <p>{body}</p>
        </div>
    )
}