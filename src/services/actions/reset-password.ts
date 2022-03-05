import {
    API_URL,
    SEND_RESET_PASSWORD_REQUEST,
    SEND_RESET_PASSWORD_FAILED,
    SEND_RESET_PASSWORD_SUCCESS,
} from '../../utils/constants';
import {checkResponse} from "../../utils/helpers";

export const sendResetPassword = (password: string, token: string) => {
    return function (dispatch: any) {
        dispatch({
            type: SEND_RESET_PASSWORD_REQUEST
        })
        // Запрашиваем данные у сервера
        fetch(API_URL + 'password-reset/reset', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password, token})
        })
            .then(checkResponse)
            .then((response) => response.json())
            .then((data) => {
                    if (data.success) {
                        dispatch({
                            type: SEND_RESET_PASSWORD_SUCCESS,
                        })
                    } else {
                        throw new Error('Плохой ответ от АПИ');
                    }
                }
            )
            .catch
            (err => {
                dispatch({
                    type: SEND_RESET_PASSWORD_FAILED
                })
            })
    }
}
