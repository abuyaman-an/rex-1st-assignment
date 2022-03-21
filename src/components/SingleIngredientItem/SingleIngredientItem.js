import React from "react";
import "./SingleIngredientItem.scss";

const SingleIngredientItem = ({ name, amount, unit, image }) => {
    return (
        <div className="single-ingredient-item">
            {
                image &&
                <img className="single-ingredient-item__img" alt={name} src={`https://spoonacular.com/cdn/ingredients_100x100/${image}`} />
            }
            <div className="single-ingredient-item__info-wrapper">
                <p className="single-ingredient-item__title">{name}</p>
                <p className="single-ingredient-item__amount">{amount} {unit}</p>
            </div>
        </div>
    )
}

export default SingleIngredientItem;