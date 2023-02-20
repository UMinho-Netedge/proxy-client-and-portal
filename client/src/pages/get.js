import React, { useState } from 'react';
import axios from 'axios';

export const Get = () => {
  const [responseData, setResponseData] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [buttonText, setButtonText] = useState("Show more searching options");
  const [showOutput, setShowOutput] = useState(false);
  const [appName, setAppName] = useState("");
  const [appProvider, setAppProvider] = useState("");
  const [appSoftVersion, setAppSoftVersion] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [serviceCont, setServiceCont] = useState("");
  const url = "http://127.0.0.1:5005/app_list";

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  function handleClick() {
    setButtonText(buttonText === "Show more searching options" ? "Hide searching options" : "Show more searching options");
  }

  function handleOutput() {
    setShowOutput(!showOutput);

    const parameters = {
      appName: appName,
      appProvider: appProvider,
      appSoftVersion: appSoftVersion,
      vendorId: vendorId,
      serviceCont: serviceCont
    };

    let parValue = {};
    for (let key in parameters) {
      if (parameters[key] !== "") {
        parValue[key] = parameters[key];
      }
    }

    const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU5NjJlN2EwNTljN2Y1YzBjMGQ1NmNiYWQ1MWZlNjRjZWVjYTY3YzYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3ODY5Mjc1MDkzNzItOHFxbjNlZDBsc2RqazI5aWh2ZzlvYjBlZXJxcWlhMm4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3ODY5Mjc1MDkzNzItOHFxbjNlZDBsc2RqazI5aWh2ZzlvYjBlZXJxcWlhMm4uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDk4NzU0NzExMjYzMzA5MzkzMjIiLCJlbWFpbCI6Im5ldGVkZ2Vwcm9qZWN0QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiVlpXS0RBMWFWdjFQbk1uemxQc242USIsImlhdCI6MTY3NjY0MjAyMywiZXhwIjoxNjc2NjQ1NjIzfQ.C9eiP8gKkrgdKlM85PsUWRh2JgmYIsRiM1357WFwnTCRodlBKCp6aiK8goTYh4-Om4y2R8NwMiYVBNkloccefMO6gkkgGDB3kPCktz72rO2d9K0h6o0uAkz0-0fkzdY4cRdmNj9jsLOwq4M-HFHcz5VgOO12fSOkNC0GSv9WuKbGEmgZPU5NpLJx5xs56e7yQp_lpoaVxjZkINtdq_IISaHOkPN1Ew2LvgHtbMPVvWQbDOwznxm37WSDJCMNglNWd59W5OgIS8pW7hx5tYKpQzyCHzwX4qjCMLNhqUdics8FiH7l5bwKTpDqbKlT30NNOgxpVlY-Il9o7exbdy6cKA"
    axios.get(url, { params: parValue, headers: { 'access_token': token } })
      .then(response => {
        setResponseData(JSON.stringify(response.data["body"]));
        setOutputText(response.data["status"]);
      })
  }

  return (
    <div className="get">
    <h2>Get App List</h2>
      <p name="url">Sending to http://127.0.0.1:8080/app_list </p>
      <div className="parameters">
        <button className='button_get' onClick={() => { handleClick(); handleToggle() }}>{buttonText}</button>
        {isOpen ? (
          <div>
            <h4>Parameters</h4>
            <div className="column">
              <input placeholder="appName" type="text" value={appName} onChange={e => setAppName(e.target.value)} />
              <input placeholder="appProvider" type="text" value={appProvider} onChange={e => setAppProvider(e.target.value)} />
              <input placeholder="appSoftVersion" type="text" value={appSoftVersion} onChange={e => setAppSoftVersion(e.target.value)} />
            </div>
            <div className="column">
              <input placeholder="vendorId" type="text" value={vendorId} onChange={e => setVendorId(e.target.value)}/>
              <input placeholder="serviceCont" type="text" value={serviceCont} onChange={e => setServiceCont(e.target.value)}/>
          </div>
          </div>
          ) : null}
      </div>
      <button className='button_get' onClick={handleOutput}> Submit </button>
      <div className='sub_get'>
      <h4>Status</h4>
      <p>Response status: {outputText}</p>
      <h4>Body</h4>
      <textarea value={responseData} readOnly />
      </div>
    </div>
  )
}