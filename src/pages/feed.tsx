import React, {useEffect} from "react";
import styles from "./styles.module.css";
import FeedList from "../components/feed-list/feed-list";
import FeedStatus from "../components/feed-status/feed-status";

import {connect as connectOrdersAll} from '../services/actions/orders-all';
import {ORDERS_ALL_SERVER_URL} from "../utils/constants";
import {useDispatch} from "react-redux";

export const FeedPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(connectOrdersAll(`${ORDERS_ALL_SERVER_URL}`));
    });
    return (
        <article className={styles.flex}>
            <main className={styles.index}>
                <section className={styles.mainFeed}>
                    <h2 className={`mt-10 mb-5 text text_type_main-large`}>Лента заказов</h2>

                    <FeedList/>
                </section>
                <FeedStatus/>

            </main>
        </article>
    );
}