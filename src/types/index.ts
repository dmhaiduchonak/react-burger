import {Location} from "history";
import {Dispatch} from 'redux';
import {TConstructorActions} from "../services/actions/constructor";
import {ThunkAction} from 'redux-thunk';
import {Action, ActionCreator} from 'redux';
import {TOrdersActions} from "../services/actions/orders";
import {TForgotPasswordActions} from "../services/actions/forgot-password";
import {TIngredientsActions} from "../services/actions/ingredients";
import {TLoginActions} from "../services/actions/login";
import {TLogoutActions} from "../services/actions/logout";
import {TOrderActions} from "../services/actions/order";
import {TProfileActions} from "../services/actions/profile";
import {TRegistrationActions} from "../services/actions/registration";
import {TResetPasswordActions} from "../services/actions/reset-password";
import {TTokenActions} from "../services/actions/token";
import {RootState} from "../services/store";

export type TItem = {
    _id: string;
    id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    image: string;
    image_mobile: string;
    image_large: string;
    price: number;
    __v: number;
    key: string;
    counter: number;
}

export type LocationState = {
    from: Location;
    background?: Location;
};

type TApplicationActions =
    | TConstructorActions
    | TForgotPasswordActions
    | TOrdersActions
    | TIngredientsActions
    | TLoginActions
    | TLogoutActions
    | TOrderActions
    | TProfileActions
    | TRegistrationActions
    | TResetPasswordActions
    | TTokenActions
    | any // Хак для   dispatch(makeTokenRefresh(saveProfile(email, name, password)));

    ;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;
export type AppDispatch = Dispatch<TApplicationActions>;

export enum WebsocketStatus {
    CONNECTING = 'CONNECTING...',
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}

export interface TOrdersRow {
    _id: string;
    status: string;
    name: string;
    number: number;
    createdAt: string;
    updatedAt: string;
    ingredients: Array<string>;
}

export type TOrders = Array<TOrdersRow>;

export type TOrdersPayload = {
    success: boolean,
    orders: TOrders,
    total: number,
    totalToday: number
}

