import React, { useEffect } from "react";
import RecipesList from "../../components/RecipesList/RecipesList";
import Search from "../../components/Search/Search";
import { MetaTags } from "react-meta-tags";
import HeroSection from "../../components/HeroSection/HeroSection";
import { connect } from "react-redux";
import { loadRandomRecipes, loadHealthyRecipes, updateSearchTerm } from "../../store/recipes/actions.recipes";
import { getHealthyRecipes, getRandomRecipes, getSearchedTerm, getSearchResults } from "../../store/recipes/selectors.recipes";
import { useSearchParams } from "react-router-dom";

const Homepage = ({ healthyRecipes, randomRecipes, initHealthyRecipes, initRandomRecipes, searchedTerm, searchResults, updateSearchTerm }) => {
    /**
     * The homepage screen, shows two lists of recipes in addition to a search functionality.
     */

    const HomepageDescription = "A website for finding your next recipe";
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        // Dispatch fetch sections recipes on mount
        initRandomRecipes();
        initHealthyRecipes(4);
    }, [])

    const triggerSearch = (term) => {
        if (term.trim()) {
            updateSearchTerm({ term });
            // fetchSuggestions(term);
            // Update the URL search parameters
            setSearchParams({ search: term });
        }
    }

    return (
        <>
            <MetaTags>
                <title>Da'Recipe - Homepage</title>
                <meta name="description" content={HomepageDescription} />
            </MetaTags>
            <div className="main">
                <HeroSection
                    title="Welcome to Da'Recipe"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                    callToActionLabel="About us! →"
                    callToActionLink="/about"
                />
                <div className="main-content__grid">
                    <Search
                        triggerSearch={triggerSearch}
                        searchParams={searchParams}
                        searchResults={searchResults}
                        searchedTerm={searchedTerm}
                    />
                    <RecipesList
                        numToExpect={4}
                        name="Random recipes"
                        recipes={randomRecipes.recipes}
                        actionComponent={<i className="las la-redo-alt"></i>}
                        actionOnClick={initRandomRecipes}
                        loading={randomRecipes.loading}
                        error={randomRecipes.error}
                    />
                    <RecipesList
                        numToExpect={4}
                        name="Healthy recipes"
                        recipes={healthyRecipes.recipes}
                        loading={healthyRecipes.loading}
                        error={healthyRecipes.error}
                    />
                </div>
            </div>
        </>
    )
}

export default connect((state) => ({
    searchResults: getSearchResults(state),
    searchedTerm: getSearchedTerm(state),
    randomRecipes: getRandomRecipes(state),
    healthyRecipes: getHealthyRecipes(state),
}), {
    initRandomRecipes: loadRandomRecipes.started,
    initHealthyRecipes: loadHealthyRecipes.started,
    updateSearchTerm: updateSearchTerm,
})(Homepage);