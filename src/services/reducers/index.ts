import {Action, CombinedState, combineReducers} from 'redux';
import {ingredientsReducer, IngredientsStore} from './ingredients';
import {constructorReducer, ConstructorStore} from './constructor';
import {orderReducer, OrderStore} from './order';
import {currentIngredientsReducer, CurrentIngredientStore} from "./current-ingredient";
import {authReducer, AuthStore} from "./auth";
import {ordersReducer, OrdersStore} from "./orders";
import {ordersAllReducer, OrdersAllStore} from "./orders-all";
import {ThunkAction} from "redux-thunk";

//export type AppThunkAction = ThunkAction<void, Action<any>, CombinedState<{ ingredients: IngredientsStore; constructor: ConstructorStore; order: OrderStore; currentIngredient: CurrentIngredientStore; auth: AuthStore; orders: OrdersStore; ordersAll: OrdersAllStore; }>, TApplicationActions>

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    constructor: constructorReducer,
    order: orderReducer,
    currentIngredient: currentIngredientsReducer,
    auth: authReducer,
    orders: ordersReducer,
    ordersAll: ordersAllReducer,
})
