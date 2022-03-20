import {
    SEND_LOGOUT_REQUEST,
    SEND_LOGOUT_FAILED,
    SEND_LOGOUT_SUCCESS, SEND_LOGIN_REQUEST, SEND_LOGIN_SUCCESS, SEND_LOGIN_FAILED,
} from '../constants/auth';
import {API_URL} from '../../utils/constants';

import {checkResponse} from "../../utils/helpers";
import {AppDispatch, AppThunk} from "../../types";

export interface ISendLogoutRequest {
    readonly type: typeof SEND_LOGOUT_REQUEST;
}

export interface ISendLogoutSuccess {
    readonly type: typeof SEND_LOGOUT_SUCCESS;
}

export interface ISendLogoutFailed {
    readonly type: typeof SEND_LOGOUT_FAILED;
}

export type TLogoutActions =
    | ISendLogoutRequest
    | ISendLogoutSuccess
    | ISendLogoutFailed
    ;

export const sendLogout: AppThunk = () => (dispatch: AppDispatch) => {
    const refreshToken: string | null = localStorage.getItem('refreshToken');
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
