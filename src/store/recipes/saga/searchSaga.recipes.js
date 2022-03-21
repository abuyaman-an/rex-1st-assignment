import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_BASE_URL, API_KEY } from '../../../commons/functions/commons';
import { loadSearchResults, updateSearchTerm } from '../actions.recipes';

const apiCall = async (term) => {
    let result = await axios.get(`${API_BASE_URL}/recipes/complexSearch?query=${term}&apiKey=${API_KEY}&number=12`);
    let data = await result.data;
    if (result.status === 200)
        return data.results;
}

function* fetchSearchResults(action) {
    const { term } = action.payload;
    try {
        const recipes = yield call(() => apiCall(term));
        yield put(loadSearchResults.succeeded({ recipes }))
    }
    catch (error) {
        yield put(loadSearchResults.failed({ error: { code: error.response.status, message: error.response.data.message } }))
    }
}

function* searchResultsSaga() {
    yield takeEvery(updateSearchTerm.type, fetchSearchResults);
}

export default searchResultsSaga;