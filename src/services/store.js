import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit'
import {applyMiddleware} from 'redux';
import {rootReducer} from './reducers';

const preloadedState = {
    ingredients: {
        items: [],
        request: false,
        failed: false,
        currentTab: 'bun',
    },
    currentIngredient: null,

    constructor: {
        bun: null,
        items: [],
    },
    order: {
        failed: false,
        request: false,
        open: false,
    },
}

const enhancerThunk = applyMiddleware(thunk);

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: preloadedState,
    enhancers: [enhancerThunk]
})
