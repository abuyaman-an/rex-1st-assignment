import { createReducer } from "@reduxjs/toolkit";
import { getHealthyRecipes, getRandomRecipes } from "./Actions"

// Store initial state
const initialState = {
    recipes: {
        searchResults: {},
        randomRecipes: {
            recipes: [],
            loading: false,
            error: null
        },
        healthyRecipes: {
            recipes: [],
            loading: false,
            error: null
        },
    },
    ui: {
        searchTerm: "",
    }
}

export const recipesReducer = createReducer(initialState, {

    // Random recipes cases:
    [getRandomRecipes.started.type]: (state) => {
        state.recipes.randomRecipes.loading = true;
    },
    [getRandomRecipes.succeeded.type]: (state, action) => {
        state.recipes.randomRecipes.loading = false;
        state.recipes.randomRecipes.recipes = action.payload.recipes;
    },
    [getRandomRecipes.failed.type]: (state, action) => {
        state.recipes.randomRecipes.loading = false;
        state.recipes.randomRecipes.error = action.payload.error;
    },

    // Healthy recipes cases:
    [getHealthyRecipes.started.type]: (state) => {
        state.recipes.healthyRecipes.loading = true;
    },
    [getHealthyRecipes.succeeded.type]: (state, action) => {
        console.log(getHealthyRecipes.succeeded.type, action);
        state.recipes.healthyRecipes.loading = false;
        state.recipes.healthyRecipes.recipes = action.payload.recipes;
    },
    [getHealthyRecipes.failed.type]: (state, action) => {
        state.recipes.healthyRecipes.loading = false;
        state.recipes.healthyRecipes.error = action.payload.error;
    }
});

export default recipesReducer;