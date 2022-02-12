import {
    API_URL,
    SEND_LOGIN_REQUEST,
    SEND_LOGIN_FAILED,
    SEND_LOGIN_SUCCESS,
} from '../../utils/constants';
import {checkResponse} from "../../utils/helpers";

export const sendLogin = (email, password) => {
    return function (dispatch) {
        dispatch({
            type: SEND_LOGIN_REQUEST
        })
        // Запрашиваем данные у сервера
        fetch(API_URL + 'auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
            .then(checkResponse)
            .then((response) => response.json())
            .then((data) => {
                    if (data.success && data.user && data.accessToken && data.refreshToken) {
                        localStorage.setItem('accessToken', data.accessToken);
                        localStorage.setItem('refreshToken', data.refreshToken);
                        dispatch({
                            type: SEND_LOGIN_SUCCESS,
                            name: data.user.name,
                            email: data.user.email,
                        })
                    } else {
                        throw new Error('Плохой ответ от АПИ');
                    }
                }
            )
            .catch
            (err => {
                dispatch({
                    type: SEND_LOGIN_FAILED
                })
            })
    }
}
