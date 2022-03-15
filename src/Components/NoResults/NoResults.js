import React from "react";
import NoResultsImage from "../../Assets/Images/no-results.svg";
import "./NoResults.scss";

const NoResults = ({ title, message }) => {
    return (
        <div className="no-results">
            <div className="no-results__img-wrapper">
                <img className="no-results__img" src={NoResultsImage} alt="No results"></img>
            </div>
            <div className="no-results__message">
                <h2>{title}</h2>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default NoResults;