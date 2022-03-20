import {
    SEND_ORDER_REQUEST,
    SEND_ORDER_FAILED,
    SEND_ORDER_SUCCESS,
    HIDE_ORDER
} from '../constants/order';
import {RESET_CONSTRUCTOR} from '../constants/constructor'
import {API_URL} from '../../utils/constants';

import {checkResponse} from "../../utils/helpers";
import {makeTokenRefresh} from "./token";
import {AppDispatch, AppThunk} from "../../types";

export interface ISendOrderRequest {
    readonly type: typeof SEND_ORDER_REQUEST;
}

export interface ISendOrderSuccess {
    readonly type: typeof SEND_ORDER_SUCCESS;
    readonly id: number;
}

export interface ISendOrderFailed {
    readonly type: typeof SEND_ORDER_FAILED;
}

export type TOrderActions =
    | ISendOrderRequest
    | ISendOrderSuccess
    | ISendOrderFailed
    ;

export interface IHideOrder {
    readonly type: typeof HIDE_ORDER;
}
export const sendOrder: AppThunk = (selectedIds: string[]) => (dispatch: AppDispatch) => {
    const accessToken: string = localStorage.getItem('accessToken') as string;

    dispatch({
        type: SEND_ORDER_REQUEST
    })
    // Запрашиваем данные у сервера
    fetch(API_URL + 'orders', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': accessToken,
        },
        body: JSON.stringify({"ingredients": selectedIds})
    })
        .then(res => {
            if (res.status === 403) {
                dispatch(makeTokenRefresh(sendOrder(selectedIds)));
            }
            return res;

        })
        .then(checkResponse)
        .then((response) => response.json())
        .then((data) => {
                if (data.success && data.order && data.order.number) {
                    dispatch({
                        type: SEND_ORDER_SUCCESS,
                        id: data.order.number
                    })
                    dispatch({
                        type: RESET_CONSTRUCTOR,
                    })
                } else {
                    throw new Error('Плохой ответ от АПИ');
                }
            }
        )
        .catch
        (err => {
            dispatch({
                type: SEND_ORDER_FAILED
            })
        })
}

export const hideOrder = (): IHideOrder => {
    return {
        type: HIDE_ORDER
    }
}
