import React, { useEffect, useState } from "react";
import { API_BASE_URL, API_KEY, truncateString } from "../commons/functions/commons";
import RecipesList from "../screens/homepage/components/recipes-list";
import LoadingIndicator from "./loading";
import NoResultsImage from "../assets/image/no-results.svg";

const SearchBar = ({ list, value, onChange, busy }) => {
    return (
        <div className={`search__bar ${value.trim() ? "active" : ""}`}>
            <i className="search__bar__icon las la-search"></i>
            <label className="search__bar__label" id="search-recipes-label">Search recipes</label>
            <input
                list={list}
                type="search"
                value={value}
                onChange={onChange}
                className="search__bar__input"
                placeholder="Search for recipes.."
                aria-labelledby="search-recipes-label"
                aria-busy={busy ? "true" : "false"}
            />
        </div>
    )
}

const Search = () => {
    const [results, setResults] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, isLoading] = useState(false);
    const [term, setTerm] = useState("");

    useEffect(() => {
        // Show the loading indicator before sending the request..
        isLoading(true);

        // Exceutes the request only after 1 second from typing the last character
        const delayDebounceFn = setTimeout(() => {
            if (term.trim()) {
                fetchSuggestions(term);
                searchRecipes(term);
            }
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [term])

    const fetchSuggestions = async (searchTerm) => {
        try {
            let results = await fetch(`${API_BASE_URL}/recipes/autocomplete?apiKey=${API_KEY}&number=5&query=${searchTerm}`);
            results = await results.json();
            setSuggestions(results?.map(item => item.title));
        }
        catch (error) {
            console.log(error);
        }
    }

    const searchRecipes = async (searchTerm = "") => {
        if (searchTerm.trim()) {
            try {
                let results = await fetch(`${API_BASE_URL}/recipes/complexSearch?query=${searchTerm}&apiKey=${API_KEY}&number=12`);
                results = await results.json();
                setResults(results.results);
            }
            catch (error) {
                console.log(`**ERROR(searchRecipes): ${error}`);
            }
            // Hide the loading indicator
            isLoading(false);
        }
        else {
            // Indicate that the user empyted the search box and stopped using the search..
            setResults([]);
        }
    }

    return (
        <div className="search">
            <SearchBar value={term} busy={loading} onChange={(e) => setTerm(e.target.value)} />
            {
                term.trim() && results.length > 0 &&
                <div className="search__suggestions">
                    {suggestions.map(suggestion => <span onClick={() => setTerm(suggestion)} title={suggestion} className="search__suggestion">{truncateString(suggestion, 30)}</span>)}
                </div>
            }
            {term.trim() ? !loading ? (
                results.length ?
                    <div className="search__results">
                        <RecipesList
                            name={`${results.length} search results for "${term}"`}
                            recipes={results}
                        />
                    </div>
                    :
                    <div className="search__no-results">
                        <div className="search__no-results__img-wrapper">
                            <img className="search__no-results__img" src={NoResultsImage} alt="No results"></img>
                        </div>
                        <div className="search__no-results__message">
                            <h2>No results</h2>
                            <p>We found no results matching your search for "{term}",<b /> we know you're mad but, we're sorry.</p>
                        </div>
                    </div>
            )
                :
                (
                    <div className="search__loading">
                        <LoadingIndicator />
                        <p className="search__loading__message">Searching...</p>
                    </div>
                ) : <></>
            }
        </div>
    );
}

export default Search;