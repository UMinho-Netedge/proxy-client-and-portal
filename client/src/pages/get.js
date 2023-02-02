import { useOutputTextState, useIsOpenState, useButtonTextState, useShowOutputState } from '../stateHooks';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


export const Get = () => {

    const [outputText, setOutputText] = useOutputTextState();
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useIsOpenState();
    const [buttonText, setButtonText] = useButtonTextState();
    const [showOutput, setShowOutput] = useShowOutputState();
    const [appName, setAppName] = useState('');
    const [appProvider, setAppProvider] = useState('');
    const [appSoftVersion, setAppSoftVersion] = useState('');
    const [vendorId, setVendorId] = useState('');
    const [serviceCont, setServiceCont] = useState('');

    function handleToggle() {
        setIsOpen(!isOpen);
      }

    function handleClick ()  {
        setButtonText(buttonText === "Show more searching options" ? "Hide searching options" : "Show more searching options");
      }

    function handleOutput() {
        setShowOutput(!showOutput);
      }
    
    useEffect(() => {
      axios.get(`http://127.0.0.1:8080/app_list?appName=${appName}&appProvider=${appProvider}&appSoftVersion=${appSoftVersion}&vendorId=${vendorId}&serviceCont=${serviceCont}`)
        .then(response => setOutputText(response.data))
        .catch(error => setError(error));
    }, [appName, appProvider, appSoftVersion, vendorId, serviceCont]);

    return (
      <div>
          <p name="url">Sending to http://127.0.0.1:8080/app_list?appName=${appName}&appProvider=${appProvider}&appSoftVersion=${appSoftVersion}&vendorId=${vendorId}&serviceCont=${serviceCont}</p>            
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
          {showOutput ? (
          <p>{outputText}</p>) : null}
      </div>
    )
}