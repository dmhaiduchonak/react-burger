import {orderReducer, initialState} from './order';
import {
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
    HIDE_ORDER
} from '../constants/order';
import {authReducer} from "./auth";
import {SEND_REGISTRATION_REQUEST, SEND_REGISTRATION_SUCCESS} from "../constants/auth";

describe('Order reducer', () => {
    it('should return the initial state', () => {
        expect(
            orderReducer(undefined, {type: '', id: ''})
        ).toEqual(
            initialState
        )
    })

    it('should handle SEND_ORDER_SUCCESS', () => {
        expect(
            orderReducer(initialState, {
                type: SEND_ORDER_SUCCESS,
                id: '111'
            })
        ).toEqual(
            expect.objectContaining({
                id: '111',
                open: true,
            })
        )
    })

    it('should handle SEND_ORDER_REQUEST', () => {
        expect(
            orderReducer(initialState, {
                type: SEND_ORDER_REQUEST,
                id: '',
            })
        ).toEqual(
            expect.objectContaining({
                request: true,
                failed: false,
            })
        )
    })

    it('should handle SEND_ORDER_FAILED', () => {
        expect(
            orderReducer(initialState, {
                type: SEND_ORDER_FAILED,
                id: '',
            })
        ).toEqual(
            initialState
        )
    })

    it('should handle HIDE_ORDER', () => {
        expect(
            orderReducer(initialState, {
                type: HIDE_ORDER,
                id: '',
            })
        ).toEqual(
            expect.objectContaining({
                open: false
            })
        )
    })
})