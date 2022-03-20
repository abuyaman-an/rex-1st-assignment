import { createAsyncActions } from "../utls";

// Random recipes actions
export const getRandomRecipes = createAsyncActions('recipes/GET_RANDOM_RECIPES');

// Healthy recipes actions
export const getHealthyRecipes = createAsyncActions('recipes/GET_HEALTHY_RECIPES');