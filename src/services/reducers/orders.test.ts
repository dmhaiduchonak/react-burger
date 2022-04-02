import {ordersReducer, initialState} from './orders';
import {WebsocketStatus} from "../../types";
import {wsClose, wsConnecting, wsError, wsMessage, wsOpen} from "../actions/orders";
import {createAction} from "@reduxjs/toolkit";

describe('Orders reducer', () => {
    it('should return the initial state', () => {
        expect(ordersReducer(undefined, createAction('TEST'))).toEqual(
            initialState
        )
    })

    it('should handle wsConnecting', () => {
        expect(
            ordersReducer(initialState, wsConnecting)
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
            ordersReducer(initialState, wsOpen)
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
            ordersReducer(initialState, wsClose)
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
            ordersReducer(initialState, wsError('error'))
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
            ordersReducer(initialState, wsMessage({
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