import { createReducer } from "@reduxjs/toolkit";
import { loadHealthyRecipes, loadRandomRecipes, loadSearchResults, updateSearchTerm } from "./actions.recipes"

// Store initial state
const initialState = {
    recipes: {
        searchResults: {
            recipes: [],
            loading: false,
            error: null
        },
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
    [loadRandomRecipes.started.type]: (state) => {
        state.recipes.randomRecipes.loading = true;
    },
    [loadRandomRecipes.succeeded.type]: (state, action) => {
        state.recipes.randomRecipes.loading = false;
        state.recipes.randomRecipes.recipes = action.payload.recipes;
    },
    [loadRandomRecipes.failed.type]: (state, action) => {
        state.recipes.randomRecipes.loading = false;
        state.recipes.randomRecipes.error = action.payload.error;
    },

    // Healthy recipes cases:
    [loadHealthyRecipes.started.type]: (state) => {
        state.recipes.healthyRecipes.loading = true;
    },
    [loadHealthyRecipes.succeeded.type]: (state, action) => {
        state.recipes.healthyRecipes.loading = false;
        state.recipes.healthyRecipes.recipes = action.payload.recipes;
    },
    [loadHealthyRecipes.failed.type]: (state, action) => {
        state.recipes.healthyRecipes.loading = false;
        state.recipes.healthyRecipes.error = action.payload.error;
    },

    // Search recipes cases:
    [updateSearchTerm.type]: (state, action) => {
        state.ui.searchTerm = action.payload.term;
        state.recipes.searchResults.loading = true;
    },
    [loadSearchResults.succeeded.type]: (state, action) => {
        state.recipes.searchResults.loading = false;
        state.recipes.searchResults.recipes = action.payload.recipes;
    },
    [loadSearchResults.failed.type]: (state, action) => {
        state.recipes.searchResults.loading = false;
        state.recipes.searchResults.error = action.payload.error;
    },
});

export default recipesReducer;