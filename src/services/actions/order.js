
import {
    API_URL,
    SEND_ORDER_REQUEST,
    SEND_ORDER_FAILED,
    SEND_ORDER_SUCCEESS,
    HIDE_ORDER,
} from '../../utils/constants';

export const sendOrder = (selectedIds) => {
    return function (dispatch) {
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
            .then(response => {

                if (response.ok) {
                    return response;
                }
                throw Error(`${response.status} ${response.statusText}`);
            })
            .then((response) => response.json())
            .then((data) => {
                    if (data.success && data.order && data.order.number) {
                        dispatch({
                            type: SEND_ORDER_SUCCEESS,
                            id: data.order.number
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
    return function (dispatch) {
        dispatch({
            type: HIDE_ORDER
        })
    }
}
