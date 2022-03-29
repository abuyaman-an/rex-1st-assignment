import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import { MetaTags } from "react-meta-tags";
import Parser from 'html-react-parser';
import { connect } from "react-redux";
import axios from "axios";

import { API_BASE_URL, API_KEY, truncateString } from "../../commons/functions/commons";
import IngredientsList from "../../components/IngredientsList/IngredientsList";
import { getRandomRecipes } from "../../store/recipes/selectors.recipes";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { loadRandomRecipes } from "../../store/recipes/actions.recipes";
import RecipesList from "../../components/RecipesList/RecipesList";
import Badge from "../../components/Badge/Badge";
import "./RecipeDetails.scss";

const RecipeDetails = ({ randomRecipes, initRandomRecipes }) => {
    /**
     * A screen that shows one recipe in details
     */
    const postContent = useRef(null);
    const { id } = useParams();
    const [recipeData, setRecipeData] = useState({});
    const [similarRecipes, setSimilarRecipes] = useState([]);
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        // Fetch recipe details on mount
        fetchRecipeDetails();
        fetchSimilarRecipe();

        // If there are no random recipes, dispatch a get request.
        if (randomRecipes.recipes.length === 0)
            initRandomRecipes()
    }, [id])

    const fetchRecipeDetails = async () => {
        // Fetch(get) recipe details based on the recipe ID.
        isLoading(true);
        try {
            let result = await axios.get(`${API_BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}`);
            let data = result.data;
            if (result.status === 200)
                setRecipeData(data);
        }
        catch (error) {
            console.error(`**ERR:fetchRecipeDetails ${error}`);
        }
        isLoading(false);
    }

    const fetchSimilarRecipe = async () => {
        // Fetch recipes similar to this recipe.
        try {
            let result = await axios.get(`${API_BASE_URL}/recipes/715538/similar?apiKey=${API_KEY}&number=4`);
            let data = result.data;
            if (result.status === 200)
                setSimilarRecipes(data);
        }
        catch (error) {
            console.error(`**ERR:fetchSimilarRecipe ${error}`);
        }
    }

    let processScroll = () => {
        let docElem = document.documentElement,
            docBody = document.body,
            scrollTop = docElem['scrollTop'] || docBody['scrollTop'],
            scrollBottom = (docElem['scrollHeight'] || docBody['scrollHeight']) - window.innerHeight,
            scrollPercent = scrollTop / scrollBottom * 100 + '%';

        document.querySelector('.navbar__progress-bar').style.width = scrollPercent;
    }

    useEffect(() => {
        document.addEventListener("scroll", processScroll);

        return () => {
            document.removeEventListener("scroll", processScroll);
        }
    }, [])


    // If still loading the request, show a loading indicator.
    if (loading)
        return (
            <div className="recipe-details main loading">
                <LoadingScreen message="Loading recipe" fullScreen />
            </div>
        )

    return (
        <>
            <MetaTags>
                <title>Da'Recipe - {recipeData.title}</title>
                <meta name="description" content={truncateString(recipeData.summary, 160)} />
            </MetaTags>
            <div className="sidebar-1">
                <div className="sidebar-1__inner">
                    <section className="credits">
                        <h3>By <a target="_blank" rel="noreferrer" href={recipeData.sourceUrl}>{recipeData.sourceName}<i className="las la-external-link-alt"></i></a></h3>
                        <p>{recipeData.creditsText}</p>
                    </section>
                </div>
            </div>
            <div className="recipe-details main" aria-busy={loading}>
                <img className="recipe-details__featured-img" src={recipeData.image} alt={recipeData.title} />
                <div className="recipe-details__container">
                    <div className="recipe-details__meta">
                        <div>
                            <h1 className="recipe-details__title">{recipeData.title}</h1>
                            <div className="recipe-details__meta__dish-types">
                                {
                                    recipeData.dishTypes.map((item, index) => <Badge key={index.toString()} message={item} />)
                                }
                            </div>
                        </div>
                    </div>
                    <div className="recipe-details__content" ref={postContent}>
                        {
                            // Recipe summary
                            recipeData.summary &&
                            <section>
                                <h2>Summary</h2>
                                <p>{Parser(recipeData.summary)}</p>
                            </section>
                        }
                        {
                            // Recipe ingredients
                            recipeData.extendedIngredients &&
                            <IngredientsList
                                ingredients={recipeData.extendedIngredients}
                            />
                        }
                        {
                            // Recipe instructions
                            recipeData.instructions &&
                            <section>
                                <h2>Instructions</h2>
                                <div className="recipe-details__content__instructions">{Parser(recipeData.instructions)}</div>
                            </section>
                        }
                    </div>
                </div>
                <div className="padding-wrapper gap-lg">
                    <RecipesList
                        name="Similar recipes"
                        recipes={similarRecipes}
                    />

                    <RecipesList
                        numToExpect={4}
                        name="Explore some random recipes"
                        recipes={randomRecipes.recipes}
                        actionComponent={<i className="las la-redo-alt"></i>}
                        loading={randomRecipes.loading}
                        error={randomRecipes.error}
                    />
                </div>

            </div>
        </>
    )
}

export default connect((state) => ({
    randomRecipes: getRandomRecipes(state),
}), {
    initRandomRecipes: loadRandomRecipes.started
})(RecipeDetails);