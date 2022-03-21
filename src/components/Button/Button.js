import React from "react";
import { Link } from "react-router-dom";
import "./Button.scss";

const Button = ({ label, to, onClick, className, style, primary, noShadow, ariaLabel }) => {
    if (to)
        return (
            <Link style={style} className={`btn ${className ?? ""} ${primary ? "btn--primary" : ""} ${noShadow ? "" : "btn--shadow"}`} to={to}>
                {label}
            </Link>
        )
    return (
        <button
            aria-label={ariaLabel}
            onClick={onClick}
            className={`btn ${className ?? ""} ${primary ? "btn--primary" : ""} ${noShadow ? "" : "btn--shadow"}`}>
            {label}
        </button>
    )
}

export default Button;