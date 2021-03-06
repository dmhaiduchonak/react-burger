import React, {useEffect, useMemo} from "react";
import styles from "./styles.module.css";
import {connect as connectOrdersAll, disconnect as disconnectOrdersAll} from '../services/actions/orders-all';
import {ORDERS_ALL_SERVER_URL} from "../utils/constants";
import {useAppDispatch, useAppSelector} from "../utils/hooks";
import {useLocation, useParams} from "react-router-dom";
import {LocationState} from "../types";
import FeedItem from "../components/feed-item/feed-item";

type FeedParams = {
    id: string;
};

export const FeedItemPage = () => {
    const dispatch = useAppDispatch();
    const location = useLocation<LocationState>();
    const background = location.state && location.state.background;

    const params = useParams<FeedParams>();

    const {orders} = useAppSelector(state => state.ordersAll);

    useEffect(() => {
        dispatch(connectOrdersAll(`${ORDERS_ALL_SERVER_URL}`));

        return () => {
            dispatch(disconnectOrdersAll())
        }
    }, [dispatch]);

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