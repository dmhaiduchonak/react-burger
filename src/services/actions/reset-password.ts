import {
    SEND_RESET_PASSWORD_REQUEST,
    SEND_RESET_PASSWORD_FAILED,
    SEND_RESET_PASSWORD_SUCCESS, SEND_LOGIN_REQUEST, SEND_LOGIN_SUCCESS, SEND_LOGIN_FAILED,
} from '../constants/auth';
import {API_URL} from '../../utils/constants';

import {checkResponse} from "../../utils/helpers";
import {AppDispatch, AppThunk} from "../../types";

export interface ISendResetPasswordRequest {
    readonly type: typeof SEND_RESET_PASSWORD_REQUEST;
}

export interface ISendResetPasswordSuccess {
    readonly type: typeof SEND_RESET_PASSWORD_SUCCESS;
}

export interface ISendResetPasswordFailed {
    readonly type: typeof SEND_RESET_PASSWORD_FAILED;
}

export type TResetPasswordActions =
    | ISendResetPasswordRequest
    | ISendResetPasswordSuccess
    | ISendResetPasswordFailed
    ;

export const sendResetPassword: AppThunk = (password: string, token: string) => (dispatch: AppDispatch) => {
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
