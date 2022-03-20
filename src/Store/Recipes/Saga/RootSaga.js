import { all } from "redux-saga/effects";
import healthyRecipesSaga from "./HealthyRecipesSaga";
import randomRecipesSaga from "./RandomRecipesSaga";

export default function* rootSaga() {
    yield all([
        randomRecipesSaga(),
        healthyRecipesSaga(),
    ])
}