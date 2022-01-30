import {
    SET_CURRENT_INGREDIENT,
} from '../../utils/constants';

const initialState = {
    id: '',
}

export const currentIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_INGREDIENT: {
            return action.item;
        }
        default: {
            return state
        }
    }
}
