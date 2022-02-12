import {
    API_URL,
    SEND_GET_PROFILE_REQUEST,
    SEND_GET_PROFILE_FAILED,
    SEND_GET_PROFILE_SUCCESS,
    SEND_SAVE_PROFILE_REQUEST,
    SEND_SAVE_PROFILE_FAILED,
    SEND_SAVE_PROFILE_SUCCESS,
} from '../../utils/constants';
import {makeTokenRefresh} from "./token";
import {checkResponse} from "../../utils/helpers";

export const getProfile = () => {
    return function (dispatch) {
        const accessToken = localStorage.getItem('accessToken');
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
}

export const saveProfile = (email, name, password) => {
    return function (dispatch) {
        const accessToken = localStorage.getItem('accessToken');
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
}
