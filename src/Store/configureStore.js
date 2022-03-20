import { configureStore, get } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import logger from "./Middleware/logger";
import rootSaga from "./Recipes/Saga/RootSaga";
import rootReducer from "./Recipes/Reducers";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger, sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;