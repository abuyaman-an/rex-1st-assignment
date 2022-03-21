import { Tooltip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { stripHTML, truncateString } from '../../commons/functions/commons';
import Badge from '../Badge/Badge';
import "./SingleRecipeItem.scss";

const SingleRecipeItem = ({ image, title, description, link, dishTypes, veryHealthy, loading }) => {
    /**
     * Represents a single recipe item(card) in a list of recipes e.g. (RecipesList)
     * @param {string} image - An image URL to show the recipe image
     * @param {string} title - The recipe title.
     * @param {string} [description] - (optional) The recipe description.
     * @param {string} link - The URL that the title link takes you to.
     * @param {Array} [dishTypes] - (optional) A list of dish types strings.
     * @param {boolean} [veryHealthy] - (optional) Shows if this recipe is a healthy recipe
     * @param {boolean} [loading] - (optional) Shows if the card/recipe is loading.
     */

    // If loading it shows an empty card that have some loading animations.
    if (loading)
        return (
            <div className="single-recipe-container loading" aria-busy="true">
                <div className="single-recipe">
                    <div className='single-recipe__img-container'></div>
                    <div className="single-recipe__info">
                        <h2 className="single-recipe__title" aria-hidden="true"></h2>
                        <p className="single-recipe__desc"></p>
                        <div className="single-recipe__dish-types">
                            <span className='single-recipe__dish-type'></span>
                            <span className='single-recipe__dish-type'></span>
                        </div>
                    </div>
                </div>
            </div>
        )

    return (
        <div className="single-recipe-container">
            <div className="single-recipe">
                {
                    // If veryHealthy is true shows a health badge on the recipe.
                    veryHealthy &&
                    <Tooltip title="Healthy recipe">
                        <i className="single-recipe__health-score las la-apple-alt" aria-label="Healthy recipe badge"></i>
                    </Tooltip>
                }
                {
                    image &&
                    <div className='single-recipe__img-container'>
                        <img className='single-recipe__img' loading="lazy" src={image} alt={title} />
                        <div className='single-recipe__share'>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${link}`} tabIndex="-1">
                                <i className="lab la-facebook-f"></i>
                            </a>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${link}`} tabIndex="-1">
                                <i className="lab la-twitter"></i>
                            </a>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${link}`} tabIndex="-1">
                                <i className="lab la-pinterest"></i>
                            </a>
                        </div>
                    </div>
                }

                <div className="single-recipe__info">
                    <Link to={link}>
                        <h2 title={title} className="single-recipe__title">{truncateString(title, 40)}</h2>
                    </Link>
                    {
                        description &&
                        <p className="single-recipe__desc">{truncateString(stripHTML(description))}</p>
                    }
                    <div className="single-recipe__dish-types">
                        {dishTypes?.slice(0, 2).map((dishType, index) => <Badge key={index.toString()} message={dishType} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleRecipeItem;