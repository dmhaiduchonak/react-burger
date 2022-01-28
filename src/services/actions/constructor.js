import {nanoid} from "nanoid";

import {
    SET_CONSTRUCTOR_BUN,
    ADD_CONSTRUCTOR_ITEM,
    REMOVE_CONSTRUCTOR_ITEM,
    MOVE_CONSTRUCTOR_ITEM,
    INCREMENT_INGREDIENT_COUNTER,
    DECREMENT_INGREDIENT_COUNTER
} from '../../utils/constants';


export const addConstructorItem = (item) => {
    return function (dispatch) {
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
}

export const removeConstructorItem = (item) => {
    return function (dispatch) {
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
}

export const moveConstructorItem = (dragIndex, hoverIndex) => {
    return function (dispatch) {
        dispatch({
            type: MOVE_CONSTRUCTOR_ITEM,
            dragIndex,
            hoverIndex,
        })
    }
}
