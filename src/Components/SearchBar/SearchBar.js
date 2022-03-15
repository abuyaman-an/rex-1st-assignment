import React from "react";
import { stripSpecialCharacters } from "../../Commons/Functions/Commons";
import "./SearchBar.scss";

const SearchBar = ({ value, onChange, busy }) => {
    /**
     * A search bar component that includes only the search bar with its decoration view.
     * @param {string} value - The value of the search input.
     * @param {function} onChange - Callback function that gets called on search input onChange.
     * @param {boolean} busy - Indicates if the input is busy searching for content. For (aria-busy) attribute.
     */

    const _onChange = (e) => {
        // Prevent user from entering special characters, only letters and numbers.
        let clean = stripSpecialCharacters(e.target.value);
        // If the cleaned value is the same as the current value, don't trigger onChange callback.
        if (value !== clean)
            onChange(clean);
    }

    return (
        <div className={`search-bar ${value.trim() ? "active" : ""}`}>
            <i className="search-bar__icon las la-search"></i>
            <label className="search-bar__label" id="search-recipes-label">Search recipes</label>
            <input
                type="search"
                value={value}
                onChange={_onChange}
                className="search-bar__input"
                placeholder="Search for recipes.."
                aria-labelledby="search-recipes-label"
                aria-busy={busy ?? "false"}
            />
        </div>
    )
}

export default SearchBar;