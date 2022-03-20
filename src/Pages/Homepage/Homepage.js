import React, { useEffect } from "react";
import RecipesList from "../../Components/RecipesList/RecipesList";
import Search from "../../Components/Search/Search";
import { MetaTags } from "react-meta-tags";
import HeroSection from "../../Components/HeroSection/HeroSection";
import { useDispatch, useSelector } from "react-redux";
import { getRandomRecipes, getHealthyRecipes } from "../../Store/Recipes/Actions";

const Homepage = () => {
    /**
     * The homepage screen, shows two lists of recipes in addition to a search functionality.
     */
    const dispatch = useDispatch();

    const randomRecipes = useSelector((state) => state.recipes.randomRecipes);
    const healthyRecipes = useSelector((state) => state.recipes.healthyRecipes);

    const HomepageDescription = "A website for finding your next recipe";

    const initRandomRecipes = async (limit = 4, forceFetch = false) => {
        if (forceFetch || randomRecipes.recipes.length === 0)
            // Fetches some random recipes to show in the random recipes section. 
            dispatch(getRandomRecipes.started());
    }

    const initHealthyRecipes = async (limit = 4, forceFetch = false) => {
        if (forceFetch || healthyRecipes.recipes.length === 0)
            // Fetches some healthy recipes to show in the healthy recipes section. 
            dispatch(getHealthyRecipes.started())
    }

    useEffect(() => {
        // Dispatch fetch sections recipes on mount
        initRandomRecipes();
        initHealthyRecipes(4);
    }, [])

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
                    <Search />
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

export default Homepage;