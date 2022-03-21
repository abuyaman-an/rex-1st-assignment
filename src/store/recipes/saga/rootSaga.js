import { all } from "redux-saga/effects";
import healthyRecipesSaga from "./healthySaga.recipes";
import randomRecipesSaga from "./randomSaga.recipes";
import searchResultsSaga from "./searchSaga.recipes";

export default function* rootSaga() {
    yield all([
        randomRecipesSaga(),
        healthyRecipesSaga(),
        searchResultsSaga()
    ])
}