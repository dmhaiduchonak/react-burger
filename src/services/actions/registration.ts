import {
    API_URL,
    SEND_REGISTRATION_REQUEST,
    SEND_REGISTRATION_FAILED,
    SEND_REGISTRATION_SUCCESS,
} from '../../utils/constants';

export const sendRegistration = (email: string, password: string, name: string) => {
    return function (dispatch: any) {
        dispatch({
            type: SEND_REGISTRATION_REQUEST
        })
        // Запрашиваем данные у сервера
        fetch(API_URL + 'auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, name})
        })
            .then((response) => response.json())
            .then((data) => {
                    if (data.success && data.user && data.accessToken && data.refreshToken) {
                        localStorage.setItem('accessToken', data.accessToken);
                        localStorage.setItem('refreshToken', data.refreshToken);
                        dispatch({
                            type: SEND_REGISTRATION_SUCCESS,
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
                    type: SEND_REGISTRATION_FAILED
                })
            })
    }
}
