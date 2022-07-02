import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from 'redux-thunk';
import reducers from './reducers'

const rootReducer = combineReducers(reducers);

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;