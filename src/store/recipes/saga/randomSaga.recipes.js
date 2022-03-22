import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_BASE_URL, API_KEY } from '../../../commons/functions/commons';
import { loadRandomRecipes } from '../actions.recipes';

const apiCall = async (limit = 10) => {
    let result = await axios.get(`${API_BASE_URL}/recipes/random?number=${limit}&apiKey=${API_KEY}`);
    let { data } = result;
    if (result.status === 200)
        return data.recipes;
}

function* fetchRandomRecipes(action) {
    try {
        const recipes = yield call(apiCall);
        yield put(loadRandomRecipes.succeeded({ recipes }))
    }
    catch (error) {
        yield put(loadRandomRecipes.failed({ error: { code: error.response.status, message: error.response.data.message } }))
    }
}

function* randomRecipesSaga() {
    yield takeEvery(loadRandomRecipes.started, fetchRandomRecipes);
}

export default randomRecipesSaga;