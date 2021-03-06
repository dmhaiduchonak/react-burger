import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    SET_INGREDIENTS_CURRENT_TAB,
    INCREMENT_INGREDIENT_COUNTER,
    DECREMENT_INGREDIENT_COUNTER
} from '../constants/ingredients';
import {TItem} from "../../types";

export type IngredientsStore = {
    items: Array<TItem>,
    request: boolean,
    failed: boolean,
    currentIngredient: TItem | null,
    currentTab: string,
}

export const initialState:IngredientsStore = {
    items: [],
    request: false,
    failed: false,
    currentIngredient: null,
    currentTab: 'bun',
}

export const ingredientsReducer = (state:IngredientsStore = initialState, action:{type:string, items:TItem[], item: TItem, tab: string}) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                request: true,
                failed: false,
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                items: action.items,
                request: false,
            };
        }
        case GET_INGREDIENTS_FAILED: {
            return initialState;
        }
        case SET_INGREDIENTS_CURRENT_TAB: {
            return {
                ...state,
                currentTab: action.tab,
            };
        }
        case INCREMENT_INGREDIENT_COUNTER: {
            return {
                ...state,
                items: [
                    ...state.items.map((item: TItem) => {
                        return item._id === action.item.id ? {
                            ...item, counter: (action.item.type !== 'bun') ? (item.counter ? item.counter + 1 : 1) : (action.item.type === 'bun') ? 2 : item.counter + 1
                        } : {...item, counter: (action.item.type === 'bun' && item.type === 'bun') ? 0 : item.counter ? item.counter : 0}
                    })
                ]
            };
        }
        case DECREMENT_INGREDIENT_COUNTER: {
            return {
                ...state,
                items: [
                    ...state.items.map((item: TItem) => {
                        return item._id === action.item.id ? {
                            ...item, counter: (item.counter && item.counter > 0 && action.item.type !== 'bun') ? item.counter - 1 : 0
                        } : {...item}
                    })
                ]
            };
        }
        default: {
            return state
        }
    }
}
