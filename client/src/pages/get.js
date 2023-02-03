import { useOutputTextState, useIsOpenState, useButtonTextState, useShowOutputState } from '../stateHooks';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


export const Get = () => {
  const [responseData, setResponseData] = useState("");
  const [outputText, setOutputText] = useOutputTextState();
  //const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useIsOpenState();
  const [buttonText, setButtonText] = useButtonTextState();
  const [showOutput, setShowOutput] = useShowOutputState();
  const [appName, setAppName] = useState("");
  const [appProvider, setAppProvider] = useState("");
  const [appSoftVersion, setAppSoftVersion] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [serviceCont, setServiceCont] = useState("");
  const url = "http://127.0.0.1:8080/app_list" 

  function handleToggle() {
      setIsOpen(!isOpen);
  }

  function handleClick ()  {
      setButtonText(buttonText === "Show more searching options" ? "Hide searching options" : "Show more searching options");
  }

  function handleOutput() {
      setShowOutput(!showOutput);
  }

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

  useEffect(() => {
    axios.get(url, {params: parValue})
      .then(response => {
        setOutputText(response.status);
        setResponseData(response.data);
      })
      .catch(error => {
        setOutputText(error.response.status);
        setResponseData(typeof error.response.data === 'object' ? JSON.stringify(error.response.data) : error.response.data);
      });
  }, []);
  
  return (
    <div>
      <p name="url">Sending to {url}</p>            
      <div className="parameters">
          <button onClick={() => {handleClick(); handleToggle()}}> {buttonText} </button>
          {isOpen ? (
          <div>
          <div className="column">
              <input placeholder="appName" type="text" value={appName} onChange={e => setAppName(e.target.value)}/>
              <input placeholder="appProvider" type="text" value={appProvider} onChange={e => setAppProvider(e.target.value)}/>
              <input placeholder="appSoftVersion" type="text" value={appSoftVersion} onChange={e => setAppSoftVersion(e.target.value)}/>
          </div>
          
          <div className="column">
              <input placeholder="vendorId" type="text" value={vendorId} onChange={e => setVendorId(e.target.value)}/>
              <input placeholder="serviceCont" type="text" value={serviceCont} onChange={e => setServiceCont(e.target.value)}/>
          </div>
          </div>
          ) : null}
      </div>
      <button onClick={handleOutput}> Submit </button>
      <p>Response status: {outputText}</p>
      <h4>Body</h4>
      <textarea value={responseData} readOnly />
    </div>
  )
}