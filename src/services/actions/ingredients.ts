import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    SET_CURRENT_INGREDIENT,
    RESET_CURRENT_INGREDIENT,
    SET_INGREDIENTS_CURRENT_TAB,
} from '../constants/ingredients';
import {API_URL} from '../../utils/constants';

import {checkResponse} from "../../utils/helpers";
import {AppDispatch, AppThunk} from "../../types";

export interface ISetIngredientsCurrentTab {
    readonly type: typeof SET_INGREDIENTS_CURRENT_TAB;
    readonly tab: string;
}

export interface ISetCurrentIngredient {
    readonly type: typeof SET_CURRENT_INGREDIENT;
    readonly id: string;
}

export interface IResetCurrentIngredient {
    readonly type: typeof RESET_CURRENT_INGREDIENT;
}

export interface IGetIngredientsRequest {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
}
export interface IGetIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsActions =
    | IGetIngredientsRequest
    | IGetIngredientsSuccess
    | IGetIngredientsFailed
    ;

export const setIngredientsCurrentTab = (tab: string): ISetIngredientsCurrentTab => {
    return {
        type: SET_INGREDIENTS_CURRENT_TAB,
        tab: tab
    }
}

export const setCurrentIngredient = (id: string): ISetCurrentIngredient => {
    return {
        type: SET_CURRENT_INGREDIENT,
        id: id
    }
}

export const resetCurrentIngredient = (): IResetCurrentIngredient => {
    return {
        type: RESET_CURRENT_INGREDIENT,
    }
}


export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST
    })
    // Запрашиваем данные у сервера
    fetch(API_URL + 'ingredients')
        .then(checkResponse)
        .then((response) => response.json())
        .then((data) => {
                if (data.success) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        items: data.data
                    })
                } else {
                    throw new Error('Плохой ответ от АПИ');
                }
            }
        )
        .catch
        (err => {
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        })
}

