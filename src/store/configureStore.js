import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import logger from "./middleware/logger.middleware";
import rootSaga from "./recipes/saga/rootSaga";
import rootReducer from "./recipes/reducers.recipes";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger, sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;