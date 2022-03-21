import React, {useEffect} from "react";
import styles from "./styles.module.css";
import ProfileNav from "../components/profile-nav/profile-nav";
import OrdersList from "../components/orders-list/orders-list";
import {connect as connectOrders, disconnect as disconnectOrders} from "../services/actions/orders";
import {ORDERS_SERVER_URL} from "../utils/constants";
import {useAppDispatch} from "../utils/hooks";

export const OrdersPage = () => {
    const dispatch = useAppDispatch();

    const accessToken: string = localStorage.getItem('accessToken') as string;
    useEffect(() => {
        dispatch(connectOrders(`${ORDERS_SERVER_URL}?token=${accessToken.replace('Bearer ', '')}`));

        return () => {
            dispatch(disconnectOrders())
        }
    }, [dispatch]);

    return (
        <article className={styles.flex}>
            <main className={styles.main}>
                <section className={styles.section}>
                    <ProfileNav/>

                    <div className={`${styles.feedList} ml-15`}>
                    <OrdersList/>
                    </div>
                </section>
            </main>
        </article>
    );
}