import React from "react";
import SingleRecipeItem from "./single-recipe-item";

const RecipesList = ({ name, recipes, numToExpect, actionComponent, actionOnClick }) => {
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
                        // When avaiable showing the list of recipes
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