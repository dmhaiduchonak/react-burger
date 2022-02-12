import {
    SET_CURRENT_INGREDIENT,
    RESET_CURRENT_INGREDIENT
} from '../../utils/constants';

const initialState = {
    id: '',
}

export const currentIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_INGREDIENT: {
            return {id: action.id};
        }
        case RESET_CURRENT_INGREDIENT: {
            return initialState;
        }
        default: {
            return state
        }
    }
}
