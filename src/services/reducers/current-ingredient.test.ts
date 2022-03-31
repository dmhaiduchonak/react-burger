import {currentIngredientsReducer, initialState} from './current-ingredient';
import {
    SET_CURRENT_INGREDIENT,
    RESET_CURRENT_INGREDIENT
} from '../constants/ingredients';

describe('CurrentIngredients reducer', () => {
    it('should return the initial state', () => {
        expect(currentIngredientsReducer(undefined, {type: '', id: ''})).toEqual(
            initialState
        )
    })

    it('should handle SET_CONSTRUCTOR_BUN', () => {
        expect(
            currentIngredientsReducer(initialState, {
                type: SET_CURRENT_INGREDIENT,
                id: '111'
            })
        ).toEqual(
            {
                id: '111',
            }
        )
    })
    it('should handle RESET_CONSTRUCTOR', () => {
        expect(
            currentIngredientsReducer({
                id: 'aaa'
            }, {
                type: RESET_CURRENT_INGREDIENT,
                id: '0',
            })
        ).toEqual(
            {
                id: '',
            }
        )
    })

})