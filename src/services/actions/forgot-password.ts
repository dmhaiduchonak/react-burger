import {
    SEND_FORGOT_PASSWORD_REQUEST,
    SEND_FORGOT_PASSWORD_FAILED,
    SEND_FORGOT_PASSWORD_SUCCESS,
} from '../constants/auth';
import {API_URL} from '../../utils/constants';

import {checkResponse} from "../../utils/helpers";
import {AppDispatch, AppThunk} from "../../types";

export interface ISendForgotPasswordRequest {
    readonly type: typeof SEND_FORGOT_PASSWORD_REQUEST;
}
export interface ISendForgotPasswordSuccess {
    readonly type: typeof SEND_FORGOT_PASSWORD_SUCCESS;
}
export interface ISendForgotPasswordFailed {
    readonly type: typeof SEND_FORGOT_PASSWORD_FAILED;
}

export type TForgotPasswordActions =
    | ISendForgotPasswordRequest
    | ISendForgotPasswordSuccess
    | ISendForgotPasswordFailed
    ;

export const sendForgotPassword: AppThunk = (email: string) => (dispatch: AppDispatch) => {
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
