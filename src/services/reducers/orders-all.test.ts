import {ordersAllReducer, initialState} from './orders-all';
import {WebsocketStatus} from "../../types";
import {wsClose, wsConnecting, wsError, wsMessage, wsOpen} from "../actions/orders-all";
import {createAction} from "@reduxjs/toolkit";

describe('OrdersAll reducer', () => {
    it('should return the initial state', () => {
        expect(ordersAllReducer(undefined, createAction('TEST'))).toEqual(
            initialState
        )
    })

    it('should handle wsConnecting', () => {
        expect(
            ordersAllReducer(initialState, wsConnecting)
        ).toEqual(
            expect.objectContaining(
                {
                    status: WebsocketStatus.CONNECTING,
                }
            )
        )
    })

    it('should handle wsOpen', () => {
        expect(
            ordersAllReducer(initialState, wsOpen)
        ).toEqual(
            expect.objectContaining(
                {
                    status: WebsocketStatus.ONLINE,
                    connectionError: '',
                }
            )
        )
    })

    it('should handle wsClose', () => {
        expect(
            ordersAllReducer(initialState, wsClose)
        ).toEqual(
            expect.objectContaining(
                {
                    status: WebsocketStatus.OFFLINE,
                }
            )
        )
    })

    it('should handle wsError', () => {
        expect(
            ordersAllReducer(initialState, wsError('error'))
        ).toEqual(
            expect.objectContaining(
                {
                    connectionError: 'error',
                }
            )
        )
    })

    it('should handle wsMessage', () => {
        expect(
            ordersAllReducer(initialState, wsMessage({
                success: true,
                orders: [
                    {
                        createdAt: "2022-03-30T16:09:01.100Z",
                        ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733cb'],
                        name: "Био-марсианский флюоресцентный бургер",
                        number: 12470,
                        status: "done",
                        updatedAt: "2022-03-30T16:09:01.269Z",
                        _id: "6244809d1a3b2c001bcf3ad1",
                    },
                ],
                total: 5,
                totalToday: 2
            }))
        ).toEqual(
            expect.objectContaining(
                {
                    orders: [
                        {
                            createdAt: "2022-03-30T16:09:01.100Z",
                            ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733cb'],
                            name: "Био-марсианский флюоресцентный бургер",
                            number: 12470,
                            status: "done",
                            updatedAt: "2022-03-30T16:09:01.269Z",
                            _id: "6244809d1a3b2c001bcf3ad1",
                        },
                    ],
                    total: 5,
                    totalToday: 2,
                }
            )
        )
    })
})