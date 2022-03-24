import {
    SEND_TOKEN_REFRESH_REQUEST,
    SEND_TOKEN_REFRESH_FAILED,
    SEND_TOKEN_REFRESH_SUCCESS
} from '../constants/auth';
import {API_URL} from '../../utils/constants';

import {checkResponse} from "../../utils/helpers";
import {AppDispatch, AppThunk} from "../../types";

export interface ISendTokenRefreshRequest {
    readonly type: typeof SEND_TOKEN_REFRESH_REQUEST;
}

export interface ISendTokenRefreshSuccess {
    readonly type: typeof SEND_TOKEN_REFRESH_SUCCESS;
}

export interface ISendTokenRefreshFailed {
    readonly type: typeof SEND_TOKEN_REFRESH_FAILED;
}

export type TTokenActions =
    | ISendTokenRefreshRequest
    | ISendTokenRefreshSuccess
    | ISendTokenRefreshFailed
    ;

export const makeTokenRefresh:AppThunk = (cb: any) =>  (dispatch: AppDispatch) => {
        const refreshToken: string|null = localStorage.getItem('refreshToken');
        dispatch({
            type: SEND_TOKEN_REFRESH_REQUEST
        })
        // Запрашиваем данные у сервера
        fetch(API_URL + 'auth/token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token: refreshToken})
        })
            .then(checkResponse)
            .then((response) => response.json())
            .then((data) => {
                    if (data.success && data.accessToken && data.refreshToken) {
                        localStorage.setItem('accessToken', data.accessToken);
                        localStorage.setItem('refreshToken', data.refreshToken);
                        dispatch({
                            type: SEND_TOKEN_REFRESH_SUCCESS,
                        })
                        dispatch(cb());
                    } else {
                        throw new Error('Плохой ответ от АПИ');
                    }
                }
            )
            .catch
            (err => {
                dispatch({
                    type: SEND_TOKEN_REFRESH_FAILED
                })
            })
}