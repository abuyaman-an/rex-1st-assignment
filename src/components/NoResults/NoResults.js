import React from "react";
import NoResultsImage from "../../assets/Images/no-results.svg";
import "./NoResults.scss";

const NoResults = ({ title, message }) => {
    return (
        <div className="no-results">
            <img className="no-results__img" src={NoResultsImage} alt="No results"></img>
            <div className="no-results__message-wrapper">
                <h2>{title}</h2>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default NoResults;