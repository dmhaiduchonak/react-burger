import {
    SEND_REGISTRATION_REQUEST,
    SEND_REGISTRATION_FAILED,
    SEND_REGISTRATION_SUCCESS,
} from '../constants/auth';
import {API_URL} from '../../utils/constants';
import {AppDispatch, AppThunk} from "../../types";

export interface ISendRegistrationRequest {
    readonly type: typeof SEND_REGISTRATION_REQUEST;
}

export interface ISendRegistrationSuccess {
    readonly type: typeof SEND_REGISTRATION_SUCCESS;
    readonly name: string,
    readonly email: string
}

export interface ISendRegistrationFailed {
    readonly type: typeof SEND_REGISTRATION_FAILED;
}

export type TRegistrationActions =
    | ISendRegistrationRequest
    | ISendRegistrationSuccess
    | ISendRegistrationFailed
    ;

export const sendRegistration: AppThunk = (email: string, password: string, name: string) => (dispatch: AppDispatch) => {
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
