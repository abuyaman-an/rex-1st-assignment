import React from "react";

const LoadingIndicator = () => {
    /**
     * Just a plain loading spinner that animates three dots.
     */
    return (
        <div className="spinner">
            <div className="spinner-item"></div>
            <div className="spinner-item"></div>
            <div className="spinner-item"></div>
        </div>
    )
}

const LoadingScreen = ({ message, fullScreen }) => {
    /**
     * More of a loading widget that takes a full block and shows the loading indicator with a message beneath
     * @param {string} [message] - (optional) The message to show under the loading indicator.
     * @param {boolean} [fullScreen] - (optional) Indicates if the widget should take the full height of the screen.
     */
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