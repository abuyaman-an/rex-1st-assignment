import React from "react";
import NoResults from "../NoResults/NoResults";
import SingleRecipeItem from "../SingleRecipeItem/SingleRecipeItem";
import "./RecipesList.scss";

const RecipesList = ({ name, recipes, numToExpect, loading, actionComponent, actionOnClick, noResultsTitle, noResultsMessage }) => {
    /**
     * A recipes list component that shows a list of recipes together.
     * @param {string} name - List name, more of a section title to show 
     * @param {Array} recipes - List of recipe objects
     * @param {number} numToExpect - (optional) If it expects a number of items (for loading cards purpose only).
     * @param {Component} actionComponent - A component/icon that shows on the other side of the title.
     * @param {function} actionOnClick - A callback function that gets called when the `actionComponent` is clicked.
     * @param {string} [noResultsTitle] - (optional) A title for the `no-results` component.
     * @param {string} [noResultsMessage] - (optional) A message for the `no-results` component.
     */
    const actionComponentCallback = () => {
        actionOnClick();
    }

    return (
        <section className="recipes-list">
            <div className="recipes-list__title-container">
                <h3 className="recipes-list__title">{name}</h3>
                {
                    actionComponent &&
                    <button onClick={actionComponentCallback} className="recipes-list__title-arrow no-btn">{actionComponent}</button>
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
                    (
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
                                            link={`recipe/${recipe.id}/`}
                                        />
                                    ))
                                }
                            </div>
                            :
                            <NoResults
                                title={noResultsTitle ?? "No results"}
                                message={noResultsMessage ?? `We found no results for "${name}",\n we know you're mad but, we're sorry.`}
                            />
                    )
            }
        </section>
    )
}

export default RecipesList;