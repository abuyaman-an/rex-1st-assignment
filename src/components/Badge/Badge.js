import PropTypes from 'prop-types';
import React from "react";
import "./Badge.scss";

const Badge = ({ onClick, message, className, type }) => {
    return (
        <span className={`badge badge-${type ?? "odd"} ${onClick ? "clickable" : ""} ${className ?? ""}`} onClick={onClick}>{message}</span>
    )
}

Badge.propTypes = {
    onClick: PropTypes.func,
    message: PropTypes.string.isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf(['odd', 'primary'])
}

export default Badge;