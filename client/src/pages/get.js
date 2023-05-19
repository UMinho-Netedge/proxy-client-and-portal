import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
var myCookies = require('./cookie.js');

export const Get = () => {

  myCookies.checkAccessToken();

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
  const url = `${process.env.REACT_APP_REQUESTS}/app_list`;
  const [cookies] = useCookies(['access_token']);
  const access_token = cookies.access_token;

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

    axios.get(url, { params: parValue, headers: {'Authorization': 'Bearer ' + access_token} })
      .then(response => {
        setResponseData(JSON.stringify(response.data["body"], null, 2));
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
