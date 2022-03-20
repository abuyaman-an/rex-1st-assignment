import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_BASE_URL, API_KEY } from '../../../Commons/Functions/Commons';
import { getRandomRecipes } from '../Actions';

const fetchRandomRecipesAPI = async (limit = 4) => {
    let result = await axios.get(`${API_BASE_URL}/recipes/random?number=${limit}&apiKey=${API_KEY}`);
    let { data } = result;
    if (result.status === 200)
        return data.recipes;
}

function* fetchRandomRecipes(action) {
    try {
        const recipes = yield call(fetchRandomRecipesAPI);
        yield put(getRandomRecipes.succeeded({ recipes }))
    }
    catch (error) {
        yield put(getRandomRecipes.failed({ error: { code: error.response.status, message: error.response.data.message } }))
    }
}

function* randomRecipesSaga() {
    yield takeEvery(getRandomRecipes.started, fetchRandomRecipes);
}

export default randomRecipesSaga;