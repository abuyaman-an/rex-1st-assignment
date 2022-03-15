import React from "react";
import "./Badge.scss";

const Badge = ({ onClick, message }) => {
    return (
        <span className={`badge ${onClick ? "clickable" : ""}`} onClick={onClick}>{message}</span>
    )
}

export default Badge;