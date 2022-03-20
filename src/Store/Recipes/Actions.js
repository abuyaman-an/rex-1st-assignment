import { createAction } from "@reduxjs/toolkit";
import { createAsyncActions } from "../utls";

// Random recipes actions
export const getRandomRecipes = createAsyncActions("recipes/GET_RANDOM_RECIPES");

// Healthy recipes actions
export const getHealthyRecipes = createAsyncActions("recipes/GET_HEALTHY_RECIPES");

// Search recipes actions
export const updateSearchTerm = createAction("recipes/UPDATE_SEARCH_TERM");
export const getSearchResults = createAsyncActions("recipes/GET_SEARCH_RESULTS");
