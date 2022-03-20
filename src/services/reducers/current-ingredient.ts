import {
    SET_CURRENT_INGREDIENT,
    RESET_CURRENT_INGREDIENT
} from '../constants/ingredients';

export type CurrentIngredientStore = {
    id: string,
}

const initialState:CurrentIngredientStore = {
    id: '',
}

export const currentIngredientsReducer = (state:CurrentIngredientStore = initialState, action: {type: string, id: string}) => {
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
