import { useState, useEffect } from "react";

const useWindowHeight = () => {
    
    const [currentHeight, setCurrentHeight] = useState(`${window.innerHeight}px`);

    useEffect(() => {
        const handleResize = () => {
            setCurrentHeight(`${window.innerHeight}px`);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [currentHeight]); 

    return currentHeight;
}

export default useWindowHeight;
