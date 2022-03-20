import React, {useEffect} from 'react';
import styles from './styles.module.css';
import {useSelector, useDispatch} from 'react-redux';
import FeedBlock from "../feed-block/feed-block";
import {TOrders} from "../../types";

const FeedList: React.FC = () => {
    const {orders}: { orders: TOrders } = useSelector((state: any) => state.ordersAll);

    const dispatch = useDispatch();

    useEffect(() => {
//        dispatch(getIngredients())

    }, [dispatch]);

    return (

        <ul className={`${styles.list} custom-scroll`}>
            {orders && orders.length && orders.map((item) => {
                return item &&
                    <FeedBlock key={`${item._id}`} feedItem={item}/>

            })}
        </ul>
    );
}

export default FeedList;
