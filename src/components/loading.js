import React from "react";

const LoadingIndicator = () => {
    return (
        <div className="spinner">
            <div className="spinner-item"></div>
            <div className="spinner-item"></div>
            <div className="spinner-item"></div>
        </div>
    )
}

const LoadingScreen = ({ message, fullScreen }) => {
    return (
        <div className={`loading-screen ${fullScreen ? "full-screen" : ""}`}>
            <LoadingIndicator />
            {
                message &&
                <p className="loading-screen__message">{message}</p>
            }
        </div>
    )
}

export { LoadingScreen };
export default LoadingIndicator;