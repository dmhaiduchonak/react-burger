import {
    SEND_LOGIN_REQUEST,
    SEND_LOGIN_FAILED,
    SEND_LOGIN_SUCCESS, SEND_FORGOT_PASSWORD_REQUEST, SEND_FORGOT_PASSWORD_SUCCESS, SEND_FORGOT_PASSWORD_FAILED,
} from '../constants/auth';
import {API_URL} from '../../utils/constants';

import {checkResponse} from "../../utils/helpers";
import {AppDispatch, AppThunk} from "../../types";

export interface ISendLoginRequest {
    readonly type: typeof SEND_LOGIN_REQUEST;
}

export interface ISendLoginSuccess {
    readonly type: typeof SEND_LOGIN_SUCCESS;
    readonly name: string,
    readonly email: string
}

export interface ISendLoginFailed {
    readonly type: typeof SEND_LOGIN_FAILED;
}

export type TLoginActions =
    | ISendLoginRequest
    | ISendLoginSuccess
    | ISendLoginFailed
    ;

export const sendLogin: AppThunk = (email: string, password: string) => (dispatch: AppDispatch) => {
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
