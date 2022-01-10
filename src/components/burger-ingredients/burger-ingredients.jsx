import React from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = ({data}) => {
    return (
        <section className={styles.main}>
            <h2 className={`mt-10 mb-5 text text_type_main-large`}>Соберите бургер</h2>
            <ul className={`${styles.container} mb-10`}>
                <li>
                    <Tab value="bun" active={true}>
                        Булки
                    </Tab>
                </li>
                <li>
                    <Tab value="sauce" active={false}>
                        Соусы
                    </Tab>
                </li>
                <li>
                    <Tab value="main" active={false}>
                        Начинки
                    </Tab>
                </li>
            </ul>

            <ul className={`${styles.list} custom-scroll`}>
                <li className={`ml-4 mr-4`} style={{width: '100%'}}>
                    <h3 className={`mb-6 text text_type_main-medium`}>Булки</h3>
                </li>
                {data.map((item, i) => {
                    return (
                        <li key={`${data.name}_${i}`} className={`${styles.item} ml-4 mb-10`}>
                            <Counter count={1} size="default"/>
                            <img className={" .ml-4 .mr-4 .mb-1"} src={item.image} alt={item.name}/>
                            <span className={styles.goodPriceContainer + ' text text_type_digits-default'}>
                                    {item.price}&nbsp;
                                <CurrencyIcon type="primary"/>
                            </span>
                            <p className={styles.goodTitle + ' text text_type_main-default'}>{item.name}</p>
                        </li>
                    )
                })}
                <li className={" .ml-4 .mr-4"} style={{width: '100%'}}>
                    <h3 className={"mb-6 text text_type_main-medium"}>Соусы</h3>
                </li>

            </ul>
        </section>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.array
};
export default BurgerIngredients;