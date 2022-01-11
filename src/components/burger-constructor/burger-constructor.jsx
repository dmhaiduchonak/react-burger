import React from 'react';
import styles from './styles.module.css';
import {
    CurrencyIcon,
    Button,
    DragIcon,
    ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

const BurgerConstructor = ({data}) => {
    return (
        <section className={styles.main}>
            <div className={`${styles.first} ${styles.item} mb-2 pr-4 ml-2`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                />
            </div>
            <ul className={`${styles.middle} custom-scroll pr-4`}>
                {data.filter(item => item.type !== 'bun').map((item, i) => {
                    return (
                        <li className={`${styles.item} mr-2`} key={item._id}>
                            <DragIcon/>
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </li>
                    )
                })}
            </ul>
            <div className={`${styles.last} ${styles.item} mt-2 pr-4  ml-2`}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                />
            </div>

            <div className={`${styles.sum} mt-10 mr-4`}>
                <span className={' text text_type_digits-medium'}>610&nbsp;
                    <CurrencyIcon type="primary"/>
                </span>
                <div className={'ml-10'}><Button type="primary" size="large">
                    Оформить заказ
                </Button></div>
            </div>

        </section>
    );
}

BurgerConstructor.propTypes = {
    data: PropTypes.array
};

export default BurgerConstructor;