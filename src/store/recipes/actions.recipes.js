import { createAction } from "@reduxjs/toolkit";
import { createAsyncActions } from "../utls";

// Random recipes actions
export const loadRandomRecipes = createAsyncActions("recipes/GET_RANDOM_RECIPES");

// Healthy recipes actions
export const loadHealthyRecipes = createAsyncActions("recipes/GET_HEALTHY_RECIPES");

// Search recipes actions
export const updateSearchTerm = createAction("recipes/UPDATE_SEARCH_TERM");
export const loadSearchResults = createAsyncActions("recipes/GET_SEARCH_RESULTS");
