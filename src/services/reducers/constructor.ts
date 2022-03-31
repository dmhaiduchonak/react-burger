import update from 'immutability-helper';

import {
    SET_CONSTRUCTOR_BUN,
    ADD_CONSTRUCTOR_ITEM,
    REMOVE_CONSTRUCTOR_ITEM,
    MOVE_CONSTRUCTOR_ITEM,
    RESET_CONSTRUCTOR
} from '../constants/constructor';
import {TItem} from "../../types";

export type ConstructorStore = {
    bun: TItem | null,
    items: Array<TItem>,
}

export const initialState:ConstructorStore = {
    bun: null,
    items: [],
}

export const constructorReducer = (state:ConstructorStore = initialState, action: { type: string, item: TItem, dragIndex: number, hoverIndex: number }) => {
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
                items: [...state.items.filter((item: TItem) => {
                    return item.key !== action.item.key
                })],
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
        case RESET_CONSTRUCTOR: {
            return initialState;
        }

        default: {
            return state
        }
    }
}
