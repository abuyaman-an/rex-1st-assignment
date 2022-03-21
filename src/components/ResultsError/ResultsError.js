import React from "react";
import ResultsErrorImage from "../../assets/Images/peep-error.svg";
import "./ResultsError.scss";

const ResultsError = ({ errorObj, retryCallback }) => {
    return (
        <div className="results-error">
            <div className="results-error__img-wrapper">
                <span className="results-error__code">{errorObj.code}</span>
                <img className="no-results__img" src={ResultsErrorImage} alt="No results"></img>
            </div>
            <div className="results-error__message-wrapper">
                <h2 className="results-error__title">An Error!</h2>
                <p className="results-error__message">{errorObj.message}</p>
            </div>
        </div>
    )
}

export default ResultsError;