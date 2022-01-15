import React from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

import IngredientShape from "../../utils/shapes";

const BurgerIngredients = ({data}) => {
    const [currentIngredient, setCurrentIngredient] = React.useState(null);

    const handleIngredientClick = (id) => {
        setCurrentIngredient(data.find(x => x._id === id));
    }

    const handleModalClose = (event) => {
        setCurrentIngredient(null);
    }

    const bunList = data.filter(item => item.type === 'bun');
    const sauceList = data.filter(item => item.type === 'sauce');
    const mainList = data.filter(item => item.type === 'main');

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
                <li className={`${styles.typeTitle} ml-4 mr-4`}>
                    <h3 className={`mb-6 text text_type_main-medium`}>Булки</h3>
                </li>
                {bunList.map((item) => {
                    return (
                        <li key={`${item._id}`} className={`${styles.item} ml-4 mb-10`} onClick={() => {
                            handleIngredientClick(item._id)
                        }}>
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
                <li className={`${styles.typeTitle} ml-4 mr-4`}>
                    <h3 className={"mb-6 text text_type_main-medium"}>Соусы</h3>
                </li>
                {sauceList.map((item, i) => {
                    return (
                        <li key={`${item._id}`} className={`${styles.item} ml-4 mb-10`} onClick={() => {
                            handleIngredientClick(item._id)
                        }}>
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
                <li className={`${styles.typeTitle} ml-4 mr-4`}>
                    <h3 className={"mb-6 text text_type_main-medium"}>Начинки</h3>
                </li>
                {mainList.map((item, i) => {
                    return (
                        <li key={`${item._id}`} className={`${styles.item} ml-4 mb-10`} onClick={() => {
                            handleIngredientClick(item._id)
                        }}>
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

            </ul>
            { currentIngredient && (
                <Modal title={'Детали ингредиента'} onClose={handleModalClose}>
                    <IngredientDetails ingredient={currentIngredient}/>
                </Modal>
            )}
        </section>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(IngredientShape).isRequired
};
export default BurgerIngredients;
