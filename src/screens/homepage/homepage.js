import React, { useEffect, useState } from "react";
import PeepOne from '../../assets/image/peep-setting.svg';
import { Link } from "react-router-dom";
import RecipesList from "./components/recipes-list";
import { API_BASE_URL, API_KEY } from "../../commons/functions/commons";
import Search from "../../components/search";


const Homepage = () => {
    /**
     * The homepage screen, shows two lists of recipes in addition to a search functionality.
     */
    const [randomRecipes, setRandomRecipes] = useState([]);
    const [healthRecipes, setHealthRecipes] = useState([]);

    const fetchRandomRecipes = async (limit = 4) => {
        // Fetches some random recipes to show in the random recipes section. 
        try {
            let results = await fetch(`${API_BASE_URL}/recipes/random?number=${limit}&apiKey=${API_KEY}`);
            results = await results.json();
            setRandomRecipes(results.recipes);
        }
        catch (error) {
            console.error(`**ERR:fetchRandomRecipes ${error}`);
        }
    }

    const fetchHealthRecipes = async (limit = 4) => {
        // Fetches some healthy recipes to show in the healthy recipes section. 
        try {
            let results = await fetch(`${API_BASE_URL}/recipes/complexSearch?veryHealthy=true&number=${limit}&apiKey=${API_KEY}`);
            results = await results.json();
            setHealthRecipes(results.results.map(recipe => {
                recipe.veryHealthy = true;
                return recipe;
            }));
        }
        catch (error) {
            console.error(`**ERR:fetchHealthRecipes ${error}`);
        }
    }

    useEffect(() => {
        // Get sections recipes on mount
        fetchRandomRecipes(4);
        fetchHealthRecipes(4);
    }, [])

    return (
        <>
            <div className="main">
                <header className="main-content__header">
                    <div className="main-content__header__inner">
                        <img src={PeepOne} alt="A doodle of a guy sitting" />
                        <div className="main-content__header__inner__text">
                            <h1>Welcome to<br /> Da'Recipe!
                            </h1>
                            <p className="big">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                            <Link to="/about">
                                <button className='btn' style={{ alignSelf: 'flex-start' }}>About us! →</button>
                            </Link>
                        </div>
                    </div>
                </header>

                <div className="main-content__grid">
                    <Search />
                    <RecipesList
                        numToExpect={4}
                        name="Random recipes"
                        recipes={randomRecipes}
                        actionComponent={<i className="las la-redo-alt"></i>}
                        actionOnClick={() => fetchRandomRecipes(4)}
                    />
                    <RecipesList
                        numToExpect={4}
                        name="Healthy recipes"
                        recipes={healthRecipes}
                    />
                </div>
            </div>
        </>
    )
}

export default Homepage;