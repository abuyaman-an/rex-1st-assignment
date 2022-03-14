import React from 'react';
import { Link } from 'react-router-dom';
import { stripHTML, truncateString } from '../../../commons/functions/commons';

const SingleRecipeItem = ({ image, title, description, link, dishTypes, healthScore, veryHealthy, loading }) => {

    if (loading)
        return (
            <div className="recipes-list__single-container loading">
                <div className="recipes-list__single">
                    <div className='recipes-list__single__img-container'></div>
                    <div className="recipes-list__single__info">
                        <h2 className="recipes-list__single__title"></h2>
                        <p className="recipes-list__single__desc"></p>
                        <div className="recipes-list__single__dish-types">
                            <span className='recipes-list__single__dish-type'></span>
                            <span className='recipes-list__single__dish-type'></span>
                        </div>
                    </div>
                </div>
            </div>
        )

    return (
        <div className="recipes-list__single-container">
            <div className="recipes-list__single">
                {
                    veryHealthy &&
                    <i className="recipes-list__single__health-score las la-apple-alt"></i>
                }
                <div className='recipes-list__single__img-container'>
                    <img className='recipes-list__single__img' loading="lazy" src={image} alt={title} />
                    <div className='recipes-list__single__share'>
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
                <div className="recipes-list__single__info">
                    <Link to={link}>
                        <h2 title={title} className="recipes-list__single__title">{truncateString(title, 40)}</h2>
                    </Link>
                    {description &&
                        <p className="recipes-list__single__desc">{truncateString(stripHTML(description))}</p>
                    }
                    <div className="recipes-list__single__dish-types">
                        {dishTypes?.slice(0, 2).map((dishType, index) => <span key={index.toString()} className='recipes-list__single__dish-type'>{dishType}</span>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleRecipeItem;