import {
    API_URL,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_SUCCESS,
    SET_CURRENT_INGREDIENT,
    SET_INGREDIENTS_CURRENT_TAB,
} from '../../utils/constants';
import {checkResponse} from "../../utils/helpers";

export const setIngredientsCurrentTab = (tab) => {
    return {
        type: SET_INGREDIENTS_CURRENT_TAB,
        tab: tab
    }
}


export const setCurrentIngredient = (item) => {
    return {
        type: SET_CURRENT_INGREDIENT,
        item: item
    }
}

export const getIngredients = () => {
    return function (dispatch) {
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
}

