import React, { useEffect, useState } from "react";
import axios from "axios";

import { API_BASE_URL, API_KEY, truncateString } from "../../commons/functions/commons";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import RecipesList from "../RecipesList/RecipesList";
import SearchBar from "../SearchBar/SearchBar";
import Badge from "../Badge/Badge";
import "./Search.scss";

const Search = ({ triggerSearch, searchParams, searchResults, searchedTerm }) => {

    const [suggestions, setSuggestions] = useState([]);
    const [term, setTerm] = useState("");

    useEffect(() => {
        // Reading search params on mount.
        const searchParam = searchParams.get("search");
        if (searchParam) {
            setTerm(searchParam);
            // Trigger search to show search results.
            triggerSearch(searchParam);
        }
    }, []);

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            // Enter was pressed:
            triggerSearch(e.target.value);
        }
    }

    const fetchSuggestions = async (searchTerm) => {
        try {
            let result = await axios.get(`${API_BASE_URL}/recipes/autocomplete?apiKey=${API_KEY}&number=5&query=${searchTerm}`);
            let data = result.data;
            if (result.status === 200)
                setSuggestions(data.map(item => item.title));
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleOnChange = (text) => {
        setTerm(text);
    }

    return (
        <div className="search">
            <SearchBar value={term} busy={searchResults.loading} onChange={handleOnChange} onKeyPress={handleKeyPress} onSearchClick={() => triggerSearch(term)} />
            {
                // Show the suggestions if any exists.
                term.trim() && searchResults.recipes.length > 0 && suggestions.length > 0 &&
                <div className="search__suggestions">
                    {suggestions.map((suggestion, index) => <Badge key={index.toString()} onClick={() => setTerm(suggestion)} message={truncateString(suggestion, 30)} />)}
                </div>
            }
            {
                // If there's a search value(term) and it is not loading, then check if there are results (results.length > 0).
                // if so show search results, else show no results found message.
                // Otherwise it means it's still loading, show the loading indicator
                searchedTerm?.trim() && term.trim() ?
                    !searchResults.loading ? (
                        <div className="search__results">
                            <RecipesList
                                name={`${searchResults.recipes.length} search results for "${searchedTerm}"`}
                                recipes={searchResults.recipes}
                                noResultsMessage={`We found no results while searching for "${searchedTerm}",\n we know you're mad but, we're sorry.`}
                            />
                        </div>
                    )
                        :
                        <LoadingScreen message="Searching" /> : <></>
            }
        </div>
    );
}

export default Search;