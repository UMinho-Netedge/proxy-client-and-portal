import { useOutputTextState, useIsOpenState, useButtonTextState, useShowOutputState } from '../stateHooks';

export const Get = () => {

    const [outputText, setOutputText] = useOutputTextState();
    const [isOpen, setIsOpen] = useIsOpenState();
    const [buttonText, setButtonText] = useButtonTextState();
    const [showOutput, setShowOutput] = useShowOutputState();

    function handleToggle() {
        setIsOpen(!isOpen);
      }

    function handleClick ()  {
        setButtonText(buttonText === "Show more searching options" ? "Hide searching options" : "Show more searching options");
      }

      function handleOutput() {
        setShowOutput(!showOutput);
      }
    

    return (
        <div>
            <input className="url" placeholder="http://127.0.0.1:8080/app_list" type="text"/>            
            <div className="parameters">
                <button onClick={() => {handleClick(); handleToggle()}}> {buttonText} </button>
                {isOpen ? (
                <div>
                <div className="column">
                    <input placeholder="appName" type="text"/>
                    <input placeholder="appProvider" type="text"/>
                    <input placeholder="appSoftVersion" type="text"/>
                </div>
                
                <div className="column">
                    <input placeholder="vendorId" type="text"/>
                    <input placeholder="serviceCont" type="text"/>
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
