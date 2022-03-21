import React from "react";
import SingleIngredientItem from "../SingleIngredientItem/SingleIngredientItem";
import "./IngredientsList.scss";

const IngredientsList = ({ title, ingredients }) => {
    return (
        <section>
            <h2>{title ?? "Ingredients"}</h2>
            <div className="ingredients-list">
                {
                    ingredients.map((ingredient, index) => (
                        <SingleIngredientItem
                            key={index.toString()}
                            name={ingredient.name}
                            unit={ingredient.unit}
                            image={ingredient.image}
                            amount={ingredient.measures.us.amount}
                        />
                    ))
                }
            </div>
        </section>
    )
}

export default IngredientsList;