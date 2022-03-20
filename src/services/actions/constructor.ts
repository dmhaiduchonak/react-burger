import {nanoid} from "nanoid";

import {
    SET_CONSTRUCTOR_BUN,
    ADD_CONSTRUCTOR_ITEM,
    REMOVE_CONSTRUCTOR_ITEM,
    MOVE_CONSTRUCTOR_ITEM, RESET_CONSTRUCTOR,
} from '../constants/constructor';
import {
    INCREMENT_INGREDIENT_COUNTER,
    DECREMENT_INGREDIENT_COUNTER
} from '../constants/ingredients';

import {AppDispatch, AppThunk} from "../../types";
import {TItem} from "../../types";

export interface IMoveConstructorItem {
    readonly type: typeof MOVE_CONSTRUCTOR_ITEM;
    readonly dragIndex: number;
    readonly hoverIndex: number;
}

export interface ISetConstructionBun {
    readonly type: typeof SET_CONSTRUCTOR_BUN | typeof ADD_CONSTRUCTOR_ITEM;
    readonly item: TItem;
}

export interface IAddConstructionItem {
    readonly type: typeof ADD_CONSTRUCTOR_ITEM;
    readonly item: TItem;
}

export interface IRemoveConstructionItem {
    readonly type: typeof REMOVE_CONSTRUCTOR_ITEM;
    readonly item: TItem;
}

export interface IIncrementIngredientCounter {
    readonly type: typeof INCREMENT_INGREDIENT_COUNTER;
    readonly item: {
        id: string,
        type: string
    };
}

export interface IDecrementIngredientCounter {
    readonly type: typeof DECREMENT_INGREDIENT_COUNTER;
    readonly item: {
        id: string,
        type: string
    };
}

export interface IResetConstructor {
    readonly type: typeof RESET_CONSTRUCTOR;
}

export interface IRemoveConstructorItem {
    readonly type: typeof REMOVE_CONSTRUCTOR_ITEM;
    readonly item: {
        id: string,
        type: string,
        key: string
    };
}

export type TConstructorActions =
    | IMoveConstructorItem
    | ISetConstructionBun
    | IAddConstructionItem
    | IIncrementIngredientCounter
    | IDecrementIngredientCounter
    | IRemoveConstructorItem
    | IResetConstructor
    ;

export const addConstructorItem: AppThunk = (item: TItem) => (dispatch: AppDispatch) => {
    dispatch({
        type: item.type === 'bun' ? SET_CONSTRUCTOR_BUN : ADD_CONSTRUCTOR_ITEM,
        item: {...item, key: nanoid()}
    })
    dispatch({
        type: INCREMENT_INGREDIENT_COUNTER,
        item: {
            id: item._id,
            type: item.type
        }
    })
}

export const removeConstructorItem: AppThunk = (item: TItem) => (dispatch: AppDispatch) => {
    dispatch({
        type: REMOVE_CONSTRUCTOR_ITEM,
        item: {
            id: item._id,
            type: item.type,
            key: item.key
        }
    })
    dispatch({
        type: DECREMENT_INGREDIENT_COUNTER,
        item: {
            id: item._id,
            type: item.type
        }
    })
}

export const moveConstructorItem = (dragIndex: number, hoverIndex: number): IMoveConstructorItem => {
    return {
        type: MOVE_CONSTRUCTOR_ITEM,
        dragIndex,
        hoverIndex,
    }
}
