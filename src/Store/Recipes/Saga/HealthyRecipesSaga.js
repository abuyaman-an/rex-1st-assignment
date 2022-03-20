import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_BASE_URL, API_KEY } from '../../../Commons/Functions/Commons';
import { getHealthyRecipes } from '../Actions';

const fetchHealthyRecipesAPI = async (limit = 4) => {
    let result = await axios.get(`${API_BASE_URL}/recipes/complexSearch?veryHealthy=true&number=${limit}&apiKey=${API_KEY}`);
    let { data } = result;
    if (result.status === 200)
        return data.results;
}

function* fetchHealthyRecipes(action) {
    console.log('fetchHealthyRecipes',action);
    try {
        const recipes = yield call(fetchHealthyRecipesAPI);
        console.log('something',recipes);
        yield put(getHealthyRecipes.succeeded({ recipes }))
    }
    catch (error) {
        yield put(getHealthyRecipes.failed({ error: { code: error.response.status, message: error.response.data.message } }))
    }
}

function* healthyRecipesSaga() {
    yield takeEvery(getHealthyRecipes.started, fetchHealthyRecipes);
}

export default healthyRecipesSaga;