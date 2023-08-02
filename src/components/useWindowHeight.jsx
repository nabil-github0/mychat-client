import { useState, useEffect } from "react";

const useWindowHeight = () => {
    const getWindowHeight = () => `${window.VisualViewport.height}px`;
    const [currentHeight, setCurrentHeight] = useState(getWindowHeight());

    const resizeWindow = () => setCurrentHeight(getWindowHeight());

    useEffect(() => {
        const handleResize = () => {
            setCurrentHeight(getWindowHeight());
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [getWindowHeight()]); 

    return currentHeight;
}

export default useWindowHeight;
