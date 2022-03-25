import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit'
import {applyMiddleware} from 'redux';
import {rootReducer} from './reducers';
import {socketMiddleware} from "./middleware/socket-middleware";

import {
    connect as OrdersWsConnect,
    disconnect as OrdersWsDisconnect,
    wsConnecting as OrdersWsConnecting,
    wsOpen as OrdersWsOpen,
    wsClose as OrdersWsClose,
    wsMessage as OrdersWsMessage,
    wsError as OrdersWsError
} from "./actions/orders";

import {
    connect as OrdersAllWsConnect,
    disconnect as OrdersAllWsDisconnect,
    wsConnecting as OrdersAllWsConnecting,
    wsOpen as OrdersAllWsOpen,
    wsClose as OrdersAllWsClose,
    wsMessage as OrdersAllWsMessage,
    wsError as OrdersAllWsError
} from "./actions/orders-all";

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


const wsOrdersActions = {
    wsConnect: OrdersWsConnect,
    wsDisconnect: OrdersWsDisconnect,
    wsConnecting: OrdersWsConnecting,
    onOpen: OrdersWsOpen,
    onClose: OrdersWsClose,
    onError: OrdersWsError,
    onMessage: OrdersWsMessage,
};

const wsOrdersAllActions = {
    wsConnect: OrdersAllWsConnect,
    wsDisconnect: OrdersAllWsDisconnect,
    wsConnecting: OrdersAllWsConnecting,
    onOpen: OrdersAllWsOpen,
    onClose: OrdersAllWsClose,
    onError: OrdersAllWsError,
    onMessage: OrdersAllWsMessage,
};


const enhancerThunk = applyMiddleware(thunk, socketMiddleware(wsOrdersActions), socketMiddleware(wsOrdersAllActions));

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: preloadedState as any,
    enhancers: [enhancerThunk]
})
