import React from 'react';
import styles from './styles.module.css';
import {
    CurrencyIcon,
    Button,
    ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";

const BurgerConstructor = ({data}) => {
    return (
        <section className={styles.main}>
            <div className={`${styles.first} mb-2 pr-4`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                />
            </div>
            <div className={`${styles.middle} custom-scroll pr-4`} style={{
                flexDirection: 'column'
            }}>
                {data.map((item, i) => {
                    return (
                        <ConstructorElement
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                        />)
                })}
            </div>
            <div className={`${styles.last} mt-2 pr-4`}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
                />
            </div>

            <div className={`${styles.last} mt-10 mr-4`}>
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