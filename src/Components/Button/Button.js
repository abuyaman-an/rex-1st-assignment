import React from "react";
import { Link } from "react-router-dom";
import "./Button.scss";

const Button = ({ label, to, onClick, className, style }) => {
    if (to)
        return (
            <Link style={style} className={`btn ${className ?? ""}`} to={to}>
                {label}
            </Link>
        )
    return (
        <button
            onClick={onClick}
            className={`btn ${className ?? ""}`}>
            {label}
        </button>
    )
}

export default Button;