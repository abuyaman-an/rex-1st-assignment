import React, { useEffect, useState } from "react";
import RecipesList from "../../Components/RecipesList/RecipesList";
import { API_BASE_URL, API_KEY } from "../../Commons/Functions/Commons";
import Search from "../../Components/Search/Search";
import axios from "axios";
import { MetaTags } from "react-meta-tags";
import HeroSection from "../../Components/HeroSection/HeroSection";

const Homepage = () => {
    /**
     * The homepage screen, shows two lists of recipes in addition to a search functionality.
     */
    const [randomRecipes, setRandomRecipes] = useState();
    const [healthRecipes, setHealthRecipes] = useState();

    const HomepageDescription = "A website for finding your next recipe";

    const fetchRandomRecipes = async (limit = 4) => {
        // Fetches some random recipes to show in the random recipes section. 
        try {
            let result = await axios.get(`${API_BASE_URL}/recipes/random?number=${limit}&apiKey=${API_KEY}`);
            let { data } = result;
            if (result.status === 200)
                setRandomRecipes(data.recipes);
        }
        catch (error) {
            console.error(`**ERR:fetchRandomRecipes ${error}`);
        }
    }

    const fetchHealthRecipes = async (limit = 4) => {
        // Fetches some healthy recipes to show in the healthy recipes section. 
        try {
            let result = await axios.get(`${API_BASE_URL}/recipes/complexSearch?veryHealthy=true&number=${limit}&apiKey=${API_KEY}`);
            let { data } = result;
            if (result.status === 200)
                setHealthRecipes(data.results.map(recipe => {
                    recipe.veryHealthy = true;
                    return recipe;
                }));
        }
        catch (error) {
            console.error(`**ERR:fetchHealthRecipes ${error}`);
        }
    }

    useEffect(() => {
        // Get sections recipes on mount
        fetchRandomRecipes(4);
        fetchHealthRecipes(4);
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
                        recipes={randomRecipes}
                        actionComponent={<i className="las la-redo-alt"></i>}
                        actionOnClick={fetchRandomRecipes}
                        loading={typeof randomRecipes != "object"}
                    />
                    <RecipesList
                        numToExpect={4}
                        name="Healthy recipes"
                        recipes={healthRecipes}
                        loading={typeof healthRecipes != "object"}
                    />
                </div>
            </div>
        </>
    )
}

export default Homepage;