import React, { memo } from "react";

import NoResults from "../NoResults/NoResults";
import ResultsError from "../ResultsError/ResultsError";
import SingleRecipeItem from "../SingleRecipeItem/SingleRecipeItem";
import "./RecipesList.scss";

const RecipesList = ({ name, recipes, numToExpect, loading, actionComponent, actionOnClick, noResultsTitle, noResultsMessage, error, errorRetry, actionLabel }) => {
    /**
     * A recipes list component that shows a list of recipes together.
     * @param {string} name - List name, more of a section title to show 
     * @param {Array} recipes - List of recipe objects
     * @param {number} numToExpect - (optional) If it expects a number of items (for loading cards purpose only).
     * @param {Component} actionComponent - A component/icon that shows on the other side of the title.
     * @param {function} actionOnClick - A callback function that gets called when the `actionComponent` is clicked.
     * @param {string} [noResultsTitle] - (optional) A title for the `no-results` component.
     * @param {string} [noResultsMessage] - (optional) A message for the `no-results` component.
     * @param {object} [error] - (optional) An error object that includes an request error message and indicates that an error accord.
     * @param {function} [errorRetry] - (optional) A callback function that gets called when click the error message try again message.
     */

    const actionComponentCallback = () => {
        actionOnClick();
    }

    return (
        <section className="recipes-list">
            <div className="recipes-list__title-container">
                <h2 className="recipes-list__title">{name}</h2>
                {
                    (actionComponent && actionOnClick) &&
                    <button onClick={actionComponentCallback} aria-label={actionLabel} className="recipes-list__title-arrow no-btn">{actionComponent}</button>
                }
            </div>
            {
                numToExpect && loading ?
                    <div className="recipes-list__list">
                        {
                            // Showing `numToExpect` of loading `SingleRecipeItem` ..
                            [...Array(numToExpect)].map((item, index) => <SingleRecipeItem key={index.toString()} loading />)
                        }
                    </div>
                    :
                    !error ? (
                        recipes.length ?
                            <div className="recipes-list__list">
                                {
                                    // When avaiable show the list of recipes
                                    recipes.map((recipe, index) => (
                                        <SingleRecipeItem
                                            key={index.toString()}
                                            image={recipe.image}
                                            title={recipe.title}
                                            description={recipe.summary}
                                            dishTypes={recipe.dishTypes}
                                            veryHealthy={recipe.veryHealthy}
                                            link={`/recipe/${recipe.id}/`}
                                        />
                                    ))
                                }
                            </div>
                            :
                            <NoResults
                                title={noResultsTitle ?? "No results"}
                                message={noResultsMessage ?? `We found no results for "${name}",\n we know you're mad but, we're sorry.`}
                            />
                    ) :
                        <ResultsError
                            errorObj={error}
                            retryCallback={errorRetry}
                        />
            }
        </section>
    )
}

export default memo(RecipesList);