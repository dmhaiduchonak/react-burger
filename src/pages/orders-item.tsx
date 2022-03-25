import React, {useEffect, useMemo} from "react";
import styles from "./styles.module.css";
import {connect as connectOrders, disconnect as disconnectOrders} from '../services/actions/orders';
import {ORDERS_SERVER_URL} from "../utils/constants";
import {useAppDispatch, useAppSelector} from "../utils/hooks";
import {useLocation, useParams} from "react-router-dom";
import {LocationState} from "../types";
import FeedItem from "../components/feed-item/feed-item";

type OrdersParams = {
    id: string;
};

export const OrdersItemPage = () => {
    const dispatch = useAppDispatch();
    const location = useLocation<LocationState>();
    const background = location.state && location.state.background;
    const accessToken: string = localStorage.getItem('accessToken') as string;

    const params = useParams<OrdersParams>();

    const {orders} = useAppSelector(state => state.orders);

    useEffect(() => {
        dispatch(connectOrders(`${ORDERS_SERVER_URL}?token=${accessToken.replace('Bearer ', '')}`));

        return () => {
            dispatch(disconnectOrders())
        }
    }, [dispatch, accessToken]);

    const item = useMemo(() => {
        return  orders?.filter(o => {
            return o._id === params.id;
        })[0];

    }, [orders, params])

    if (!item)
        return (<></>)

    return (
        <div className={`${!background ? styles.center : ''}`}>
            <FeedItem item={item}/>
        </div>
    );
}