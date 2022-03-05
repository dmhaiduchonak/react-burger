import React from 'react';
import styles from './styles.module.css';
import checkmark from '../../images/checkmark.gif'

interface Props {
  orderId?: number|null;
}

const OrderDetails = ({orderId = null}: Props) => {
    return (
        <section className={`${styles.content} mb-15 mt-10 mr-10 ml-10`}>
            <p className={`${styles.counter} text text_type_digits-large`}>{orderId}</p>
            <p className={`mt-8 text text_type_main-medium`}>идентификатор заказа</p>
            <img className={`${styles.checkmark} mt-15 mb-15`} src={checkmark} alt={''}/>
            <p className={`mb-2 text text_type_main-default`}>Ваш заказ начали готовить</p>
            <p className={`mb-30 text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной
                станции</p>
        </section>
    );
}

export default OrderDetails;