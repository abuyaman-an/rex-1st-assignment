import React from "react";
import "./LoadingIndicator.scss";

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

export default LoadingIndicator;