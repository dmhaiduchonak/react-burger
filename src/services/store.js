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
    currentIngredient: {
        id: null
    },
    constructor: {
        bun: null,
        items: [],
    },
    order: {
        failed: false,
        request: false,
        open: false,
    },
    auth: {
        name: null,
        email: null,
        is_login_completed: false,
        login_failed: false,
        login_request: false,
        logout_failed: false,
        logout_request: false,
        registration_failed: false,
        registration_request: false,
        forgot_password_failed: false,
        forgot_password_request: false,
        forgot_password_completed: false,
        reset_password_failed: false,
        reset_password_request: false,
        reset_password_completed: false,
        get_profile_failed: false,
        get_profile_request: false,
        save_profile_failed: false,
        save_profile_request: false,
    },
}

const enhancerThunk = applyMiddleware(thunk);

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: preloadedState,
    enhancers: [enhancerThunk]
})
