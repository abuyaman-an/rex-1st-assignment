import React from "react";
import SingleRecipeItem from "./single-recipe-item";

const RecipesList = ({ name, recipes, numToExpect, actionComponent, actionOnClick }) => {
    /**
     * A recipes list component that shows a list of recipes together.
     * @param {string} name - List name, more of a section title to show 
     * @param {Array} recipes - List of recipe objects
     * @param {number} numToExpect - (optional) If it expects a number of items (for loading cards purpose only).
     * @param {Component} actionComponent - A component/icon that shows on the other side of the title.
     * @param {function} actionOnClick - A callback function that gets called when the `actionComponent` is clicked.
     */
    return (
        <section className="recipes-list">
            <div className="recipes-list__title-container">
                <h3 className="recipes-list__title">{name}</h3>
                {
                    actionComponent &&
                    <button onClick={actionOnClick} className="recipes-list__title-arrow no-btn">{actionComponent}</button>
                }
            </div>
            <div className="recipes-list__list">
                {
                    !recipes?.length && numToExpect ?
                        // Showing `numToExpect` of loading `SingleRecipeItem` ..
                        [...Array(numToExpect)].map((item, index) => <SingleRecipeItem key={index.toString()} loading />)
                        :
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
                        ))}
            </div>
        </section>
    )
}

export default RecipesList;