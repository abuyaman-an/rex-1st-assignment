import React, { useEffect, useRef, useState } from "react";
import { API_BASE_URL, API_KEY } from "../../commons/functions/commons";
import { useParams } from 'react-router-dom';
import { LoadingScreen } from "../../components/loading";
import Parser from 'html-react-parser';

const RecipeDetails = () => {

    const postContent = useRef(null);
    const { id } = useParams();
    const [recipeData, setRecipeData] = useState({});
    const [loading, isLoading] = useState(true);

    const fetchRecipeDetails = async () => {
        isLoading(true);
        try {
            let results = await fetch(`${API_BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}`);
            results = await results.json();
            console.log(results);
            setRecipeData(results);
        }
        catch (error) {
            console.error(`**ERR:fetchRecipeDetails ${error}`);
        }
        isLoading(false);
    }

    useEffect(() => {
        fetchRecipeDetails();
    },[])

    if (loading)
        return (
            <div className="recipe-details main loading">
                <LoadingScreen message="Loading recipe" fullScreen />
            </div>
        )

    return (
        <>
            <div className="sidebar-1">
                <div className="sidebar-1__inner">
                    <section>
                        <h3>By <a target="_blank" rel="noreferrer" href={recipeData.sourceUrl}>{recipeData.sourceName}<i className="las la-external-link-alt"></i></a></h3>
                        <p>{recipeData.creditsText}</p>
                    </section>
                </div>
            </div>
            <div className="recipe-details main">
                <img className="recipe-details__featured-img" src={recipeData.image} alt={recipeData.title} />
                <div className="recipe-details__container">
                    <div className="recipe-details__meta">
                        <div>
                            <h1 className="recipe-details__title">{recipeData.title}</h1>
                            <div className="recipe-details__meta__dish-types">
                                {
                                    recipeData.dishTypes.map((item, index) => <span className="recipe-details__meta__dish-type" key={index.toString()}>{item}</span>)
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
                            <section>
                                <h2>Ingredients</h2>
                                <div className="ingredients">
                                    {
                                        recipeData.extendedIngredients.map((ingredient, index) => (
                                            <div key={index.toString()} className="ingredients__item">
                                                <img className="ingredients__item__img" alt={ingredient.name} src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} />
                                                <div className="ingredients__item__info-wrapper">
                                                    <p className="ingredients__item__title">{ingredient.name}</p>
                                                    <p className="ingredients__item__amount">{ingredient.measures.us.amount} {ingredient.unit}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </section>
                        }
                        {
                            // Recipe instructions
                            recipeData.instructions &&
                            <section>
                                <h2>Instructions</h2>
                                <div>{Parser(recipeData.instructions)}</div>
                            </section>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default RecipeDetails;