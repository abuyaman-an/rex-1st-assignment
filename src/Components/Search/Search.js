import React, { useEffect, useState } from "react";
import { API_BASE_URL, API_KEY, truncateString } from "../../Commons/Functions/Commons";
import RecipesList from "../RecipesList/RecipesList";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import "./Search.scss";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import Badge from "../Badge/Badge";

const Search = () => {
    const [results, setResults] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, isLoading] = useState(false);
    const [term, setTerm] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const searchParam = searchParams.get("search");
        if (searchParam)
            setTerm(searchParam);
    }, [])

    useEffect(() => {
        // Show the loading indicator before sending the request..
        isLoading(true);

        // Exceutes the request only after 1 second from typing the last character
        const delayDebounceFn = setTimeout(() => {
            if (term.trim()) {
                // Fetch suggestions and recipes
                fetchSuggestions(term);
                searchRecipes(term);

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

    const searchRecipes = async (searchTerm = "") => {
        if (searchTerm.trim()) {
            try {
                let result = await axios.get(`${API_BASE_URL}/recipes/complexSearch?query=${searchTerm}&apiKey=${API_KEY}&number=12`);
                let data = await result.data;
                if (result.status === 200)
                    setResults(data.results);
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
            <SearchBar value={term} busy={loading} onChange={(text) => setTerm(text)} />
            {
                // Show the suggestions if any exists.
                term.trim() && results.length > 0 &&
                <div className="search__suggestions">
                    {suggestions.map((suggestion, index) => <Badge key={index.toString()} onClick={() => setTerm(suggestion)} message={truncateString(suggestion, 30)} />)}
                </div>
            }
            {
                // If there's a search value(term) and it is not loading, then check if there are results (results.length > 0).
                // if so show search results, else show no results found message.
                // Otherwise it means it's still loading, show the loading indicator
                term.trim() ?
                    !loading ? (
                        <div className="search__results">
                            <RecipesList
                                name={`${results.length} search results for "${term}"`}
                                recipes={results}
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