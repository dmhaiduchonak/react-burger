import {
    API_URL,
    SEND_LOGOUT_REQUEST,
    SEND_LOGOUT_FAILED,
    SEND_LOGOUT_SUCCESS,
} from '../../utils/constants';
import {checkResponse} from "../../utils/helpers";

export const sendLogout = () => {
    return function (dispatch) {
        const refreshToken = localStorage.getItem('refreshToken');
        dispatch({
            type: SEND_LOGOUT_REQUEST
        })
        // Запрашиваем данные у сервера
        fetch(API_URL + 'auth/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: refreshToken})
        })
            .then(checkResponse)
            .then((response) => response.json())
            .then((data) => {
                    if (data.success) {
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        dispatch({
                            type: SEND_LOGOUT_SUCCESS,
                        })
                    } else {
                        throw new Error('Плохой ответ от АПИ');
                    }
                }
            )
            .catch
            (err => {
                dispatch({
                    type: SEND_LOGOUT_FAILED
                })
            })
    }
}
