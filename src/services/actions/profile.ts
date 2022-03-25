import {
    SEND_GET_PROFILE_REQUEST,
    SEND_GET_PROFILE_FAILED,
    SEND_GET_PROFILE_SUCCESS,
    SEND_SAVE_PROFILE_REQUEST,
    SEND_SAVE_PROFILE_FAILED,
    SEND_SAVE_PROFILE_SUCCESS,
} from '../constants/auth';
import {API_URL} from '../../utils/constants';

import {makeTokenRefresh} from "./token";
import {checkResponse} from "../../utils/helpers";
import {AppDispatch, AppThunk} from "../../types";

export interface ISendGetProfileRequest {
    readonly type: typeof SEND_GET_PROFILE_REQUEST;
}

export interface ISendGetProfileSuccess {
    readonly type: typeof SEND_GET_PROFILE_SUCCESS;
    readonly name: string,
    readonly email: string
}

export interface ISendGetProfileFailed {
    readonly type: typeof SEND_GET_PROFILE_FAILED;
}

export interface ISendSaveProfileRequest {
    readonly type: typeof SEND_SAVE_PROFILE_REQUEST;
}

export interface ISendSaveProfileSuccess {
    readonly type: typeof SEND_SAVE_PROFILE_SUCCESS;
    readonly name: string,
    readonly email: string
}

export interface ISendSaveProfileFailed {
    readonly type: typeof SEND_SAVE_PROFILE_FAILED;
}

export type TProfileActions =
    | ISendGetProfileRequest
    | ISendGetProfileSuccess
    | ISendGetProfileFailed
    | ISendSaveProfileRequest
    | ISendSaveProfileSuccess
    | ISendSaveProfileFailed
    ;

export const getProfile: AppThunk = () => (dispatch: AppDispatch) => {
    const accessToken: string = localStorage.getItem('accessToken') as string;
    dispatch({
        type: SEND_GET_PROFILE_REQUEST
    })
    // Запрашиваем данные у сервера
    fetch(API_URL + 'auth/user', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': accessToken,
        },
    }).then(res => {
        if (res.status === 403) {
            dispatch(makeTokenRefresh(getProfile()));
        }
        return res;
    })
        .then(checkResponse)
        .then((response) => response.json())
        .then((data) => {
                if (data.success && data.user) {
                    dispatch({
                        type: SEND_GET_PROFILE_SUCCESS,
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
                type: SEND_GET_PROFILE_FAILED
            })
        })
}

export const saveProfile: AppThunk = (email: string, name: string, password: string) => (dispatch: AppDispatch) => {
    const accessToken: string = localStorage.getItem('accessToken') as string;
    dispatch({
        type: SEND_SAVE_PROFILE_REQUEST
    })
    // Запрашиваем данные у сервера
    fetch(API_URL + 'auth/user', {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': accessToken,

        },
        body: JSON.stringify({email, password, name})
    }).then(res => {
        if (res.status === 403) {
            dispatch(makeTokenRefresh(saveProfile(email, name, password)));
        }
        return res;
    })
        .then(checkResponse)
        .then((response) => response.json())
        .then((data) => {
                if (data.success && data.user) {
                    dispatch({
                        type: SEND_SAVE_PROFILE_SUCCESS,
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
                type: SEND_SAVE_PROFILE_FAILED
            })
        })
}
