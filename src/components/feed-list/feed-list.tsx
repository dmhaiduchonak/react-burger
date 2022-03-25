import React from 'react';
import styles from './styles.module.css';
import FeedBlock from "../feed-block/feed-block";
import {useAppSelector} from "../../utils/hooks";

const FeedList: React.FC = () => {
    const {orders} = useAppSelector(state => state.ordersAll);

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
