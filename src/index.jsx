import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit'
import {applyMiddleware} from 'redux';

import './index.css';
import App from 'components/app/app';
import {rootReducer} from './services/reducers';

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

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: preloadedState,
    enhancers: [enhancerThunk]
})


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,
    document.getElementById('root')
);
