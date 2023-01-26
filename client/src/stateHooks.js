import { useState } from 'react';

export const useOutputTextState = () => {
    const [outputText, setOutputText] = useState("outputText");
    return [outputText, setOutputText];
}

export const useIsOpenState = () => {
    const [isOpen, setIsOpen] = useState(false);
    return [isOpen, setIsOpen];
}

export const useButtonTextState = () => {
    const [buttonText, setButtonText] = useState("Show more searching options");
    return [buttonText, setButtonText];
}

export const useShowOutputState = () => {
    const [showOutput, setShowOutput] = useState(false);
    return [showOutput, setShowOutput];
}
