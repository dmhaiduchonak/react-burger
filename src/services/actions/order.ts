import {
    API_URL,
    SEND_ORDER_REQUEST,
    SEND_ORDER_FAILED,
    SEND_ORDER_SUCCESS,
    HIDE_ORDER, RESET_CONSTRUCTOR,
} from '../../utils/constants';
import {checkResponse} from "../../utils/helpers";
import {makeTokenRefresh} from "./token";

export const sendOrder = (selectedIds: string[]) => {
    return function (dispatch: any) {
        dispatch({
            type: SEND_ORDER_REQUEST
        })
        // Запрашиваем данные у сервера
        fetch(API_URL + 'orders', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"ingredients": selectedIds})
        })
            .then(res => {
                if (res.status === 403) {
                    dispatch(makeTokenRefresh(sendOrder(selectedIds)));
                }
                return res;

            })
            .then(checkResponse)
            .then((response) => response.json())
            .then((data) => {
                    if (data.success && data.order && data.order.number) {
                        dispatch({
                            type: SEND_ORDER_SUCCESS,
                            id: data.order.number
                        })
                        dispatch({
                            type: RESET_CONSTRUCTOR,
                        })
                    } else {
                        throw new Error('Плохой ответ от АПИ');
                    }
                }
            )
            .catch
            (err => {
                dispatch({
                    type: SEND_ORDER_FAILED
                })
            })
    }
}

export const hideOrder = () => {
    return {
        type: HIDE_ORDER
    }
}
