import React, { useEffect, useState } from "react";
import { API_BASE_URL, API_KEY, truncateString } from "../../Commons/Functions/Commons";
import RecipesList from "../RecipesList/RecipesList";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import "./Search.scss";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Badge from "../Badge/Badge";
import { updateSearchTerm } from "../../Store/Recipes/Actions";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
    const searchResults = useSelector(state => state.recipes.searchResults);

    const [suggestions, setSuggestions] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [term, setTerm] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        const searchParam = searchParams.get("search");
        if (searchParam)
            setTerm(searchParam);
    }, [])

    useEffect(() => {
        // Exceutes the request only after 1 second from typing the last character
        const delayDebounceFn = setTimeout(() => {
            if (term.trim()) {
                dispatch(updateSearchTerm({ term }));
                // fetchSuggestions(term);
                // Update the URL search parameters
                setSearchParams({ search: term });
            }
        }, 1000);

        return () => clearTimeout(delayDebounceFn);
    }, [term])

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

    return (
        <div className="search">
            <SearchBar value={term} busy={searchResults.loading} onChange={(text) => setTerm(text)} />
            {
                // Show the suggestions if any exists.
                term.trim() && searchResults.recipes.length > 0 &&
                <div className="search__suggestions">
                    {suggestions.map((suggestion, index) => <Badge key={index.toString()} onClick={() => setTerm(suggestion)} message={truncateString(suggestion, 30)} />)}
                </div>
            }
            {
                // If there's a search value(term) and it is not loading, then check if there are results (results.length > 0).
                // if so show search results, else show no results found message.
                // Otherwise it means it's still loading, show the loading indicator
                term.trim() ?
                    !searchResults.loading ? (
                        <div className="search__results">
                            <RecipesList
                                name={`${searchResults.recipes.length} search results for "${term}"`}
                                recipes={searchResults.recipes}
                                noResultsMessage={`We found no results while searching for "${term}",\n we know you're mad but, we're sorry.`}
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