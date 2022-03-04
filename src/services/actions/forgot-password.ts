import {
    API_URL,
    SEND_FORGOT_PASSWORD_REQUEST,
    SEND_FORGOT_PASSWORD_FAILED,
    SEND_FORGOT_PASSWORD_SUCCESS,
} from '../../utils/constants';
import {checkResponse} from "../../utils/helpers";

export const sendForgotPassword = (email: string) => {
    return function (dispatch: any) {
        dispatch({
            type: SEND_FORGOT_PASSWORD_REQUEST
        })
        // Запрашиваем данные у сервера
        fetch(API_URL + 'password-reset', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email})
        })
            .then(checkResponse)
            .then((response) => response.json())
            .then((data) => {
                    if (data.success) {
                        dispatch({
                            type: SEND_FORGOT_PASSWORD_SUCCESS,
                        })
                    } else {
                        throw new Error('Плохой ответ от АПИ');
                    }
                }
            )
            .catch
            (err => {
                dispatch({
                    type: SEND_FORGOT_PASSWORD_FAILED
                })
            })
    }
}
