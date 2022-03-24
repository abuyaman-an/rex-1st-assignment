import React from "react";

import { stripSpecialCharacters } from "../../commons/functions/commons";
import Button from "../Button/Button";
import "./SearchBar.scss";

const SearchBar = ({ value, onChange, onKeyPress, onSearchClick, busy }) => {
    /**
     * A search bar component that includes only the search bar with its decoration view.
     * @param {string} value - The value of the search input.
     * @param {function} onChange - Callback function that gets called on search input onChange.
     * @param {boolean} busy - Indicates if the input is busy searching for content. For (aria-busy) attribute.
     * @param {function} onSearchClick - Search button callback function.
     */

    const _onChange = (e) => {
        // Prevent user from entering special characters, only letters and numbers.
        let clean = stripSpecialCharacters(e.target.value);
        // If the cleaned value is the same as the current value, don't trigger onChange callback.
        if (value !== clean) {
            onChange(clean);
        }
    }

    return (
        <div className={`search-bar__wrapper ${value.trim() ? "active" : ""}`} role="search">
            <div className="search-bar">
                <i className="search-bar__icon las la-search"></i>
                <label className="search-bar__label sr-only" id="search-recipes-label">Search recipes</label>
                <input
                    type="search"
                    value={value}
                    onChange={_onChange}
                    onKeyDown={onKeyPress}
                    className="search-bar__input"
                    placeholder="Search for recipes.."
                    aria-labelledby="search-recipes-label"
                    aria-busy={busy ?? "false"}
                />
                <Button
                    noShadow
                    className="search-bar__search-btn"
                    ariaLabel="Search"
                    onClick={onSearchClick}
                    primary={value.trim().length > 0}
                    label="Search"
                />
            </div>
        </div>
    )
}

export default SearchBar;