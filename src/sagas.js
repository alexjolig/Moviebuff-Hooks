import { put, takeLatest, all } from 'redux-saga/effects';
import {API_KEY} from './globals';
import {UPDATE_MOVIES, REFRESH_MOVIES} from './actions';
import store from './store';

function* fetchMovies() {
  const json = yield fetch('https://api.themoviedb.org/3/search/movie?query=' + store.getState().query + '&api_key=' + API_KEY + '&page=' + store.getState().currentPage)
        .then(response => response.json(), );
  yield put({ type: UPDATE_MOVIES, json: json, });
}

function* actionWatcher() {
  yield takeLatest(REFRESH_MOVIES, fetchMovies)
}

export default function* rootSaga() {
   yield all([
     actionWatcher(),
   ]);
}
