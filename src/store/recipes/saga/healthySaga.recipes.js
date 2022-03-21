import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_BASE_URL, API_KEY } from '../../../commons/functions/commons';
import { loadHealthyRecipes } from '../actions.recipes';

const apiCall = async (limit = 4) => {
    let result = await axios.get(`${API_BASE_URL}/recipes/complexSearch?veryHealthy=true&number=${limit}&apiKey=${API_KEY}`);
    let { data } = result;
    if (result.status === 200)
        return data.results;
}

function* fetchHealthyRecipes(action) {
    try {
        const recipes = yield call(apiCall);
        yield put(loadHealthyRecipes.succeeded({ recipes }))
    }
    catch (error) {
        yield put(loadHealthyRecipes.failed({ error: { code: error.response.status, message: error.response.data.message } }))
    }
}

function* healthyRecipesSaga() {
    yield takeEvery(loadHealthyRecipes.started, fetchHealthyRecipes);
}

export default healthyRecipesSaga;