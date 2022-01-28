import { combineReducers } from 'redux';
import {ingredientsReducer} from './ingredients';
import {constructorReducer} from './constructor';
import {orderReducer} from './order';
import {currentIngredientsReducer} from "./current-ingredient";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructor: constructorReducer,
    order: orderReducer,
    currentIngredient: currentIngredientsReducer,
})
