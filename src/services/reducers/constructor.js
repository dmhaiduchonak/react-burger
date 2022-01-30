import update from 'immutability-helper';

import {
    SET_CONSTRUCTOR_BUN,
    ADD_CONSTRUCTOR_ITEM,
    REMOVE_CONSTRUCTOR_ITEM,
    MOVE_CONSTRUCTOR_ITEM,
} from '../../utils/constants';

const initialState = {
    bun: null,
    items: [],
}

export const constructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONSTRUCTOR_BUN: {
            return {
                ...state,
                bun: action.item,
            };
        }
        case ADD_CONSTRUCTOR_ITEM: {
            return {
                ...state,
                items: [...state.items, action.item],
            };
        }
        case REMOVE_CONSTRUCTOR_ITEM: {
            return {
                ...state,
                items: [...state.items.filter((item) => {return item.key !== action.item.key})],
            };
        }
        case MOVE_CONSTRUCTOR_ITEM: {
            const dragCard = state.items[action.dragIndex];

            const items = state.items;

            return {
                ...state,
                items: (update(items, {
                    $splice: [
                        [action.dragIndex, 1],
                        [action.hoverIndex, 0, dragCard],
                    ],
                }))
            };
        }
        default: {
            return state
        }
    }
}
