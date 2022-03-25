import { createAction } from '@reduxjs/toolkit';
import {TOrdersPayload} from "../../types";

export const connect = createAction<string, 'ORDERS_ALL_CONNECT'>('ORDERS_ALL_CONNECT');
export const disconnect = createAction('ORDERS_ALL_DISCONNECT');
export const wsConnecting = createAction('ORDERS_ALL_WS_CONNECTING');
export const wsOpen = createAction('ORDERS_ALL_WS_OPEN');
export const wsClose = createAction('ORDERS_ALL_WS_CLOSE');
export const wsMessage = createAction<TOrdersPayload, 'ORDERS_ALL_WS_MESSAGE'>('ORDERS_ALL_WS_MESSAGE');
export const wsError = createAction<string, 'ORDERS_ALL_WS_ERROR'>('ORDERS_ALL_WS_ERROR');

export type TOrdersAllActions = ReturnType<typeof connect>
    | ReturnType<typeof disconnect>
    | ReturnType<typeof wsConnecting>
    | ReturnType<typeof wsOpen>
    | ReturnType<typeof wsClose>
    | ReturnType<typeof wsMessage>
    | ReturnType<typeof wsError>;


