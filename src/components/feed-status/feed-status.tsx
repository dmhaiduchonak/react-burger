import React from 'react';
import styles from './styles.module.css';
import {STATUS_DONE, STATUS_PENDING} from "../../utils/constants";
import {useAppSelector} from "../../utils/hooks";

const FeedStatus: React.FC = () => {

    const {
        orders,
        total,
        totalToday
    } = useAppSelector(state => state.ordersAll);

    const completed = orders.filter(item => {
        return item.status === STATUS_DONE
    }).slice(0, 10);

    const pending = orders.filter(item => {
        return item.status === STATUS_PENDING
    }).slice(0, 10);

    return (
        <section className={`${styles.main} ml-15`}>
            <div className={styles.ordersContainer}>
                <div className={`${styles.ordersBlock}`}>
                    <h3 className={` text text_type_main-medium`}>Готовы:</h3>
                    <ul className={`${styles.ordersListContainer} mt-6 text text_type_digits-default text_color_success`}>
                        {completed && completed.length && completed.map((item) => {
                            return item &&
                                <li className='mb-2' key={item.number}>{item.number}</li>
                        })}
                    </ul>
                </div>
                <div className={`${styles.ordersBlock} ml-9`}>
                    <h3 className={` text text_type_main-medium`}>В работе:</h3>
                    <ul className={`${styles.ordersListContainer} mt-6 text text_type_digits-default`}>
                        {pending && pending.length && pending.map((item) => {
                            return item &&
                                <li className='mb-2' key={item.number}>{item.number}</li>
                        })}
                    </ul>
                </div>
            </div>
            <h3 className={'mt-15 text text_type_main-medium'}>Выполнено за все время:</h3>
            <p className={'text text_type_digits-large'}>{total}</p>
            <h3 className={'mt-15 text text_type_main-medium'}>Выполнено за сегодня:</h3>
            <p className={'text text_type_digits-large'}>{totalToday}</p>
        </section>
    );
}

export default FeedStatus;
