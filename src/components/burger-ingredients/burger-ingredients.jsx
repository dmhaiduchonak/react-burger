import React from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

import {Tab, CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from "../ingredient-details/ingredient-details";

const BurgerIngredients = ({data}) => {
    const [open, setOpen] = React.useState(false);
    const [currentIngredient, setCurrentIngredient] = React.useState({});

    const handleIngredientClick = (id) => {
        setCurrentIngredient(data.find(x => x._id === id));
        setOpen(true);
    }

    const handleModalClose = (event) => {
        setOpen(false);
    }

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
                {data.filter(item => item.type === 'bun').map((item, i) => {
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
                {data.filter(item => item.type === 'sauce').map((item, i) => {
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
                {data.filter(item => item.type === 'main').map((item, i) => {
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
            <IngredientDetails ingredient={currentIngredient} isOpen={open} onClose={handleModalClose}/>
        </section>
    );
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            '_id': PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            proteins: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired,
            calories: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            image_mobile: PropTypes.string.isRequired,
            image_large: PropTypes.string.isRequired,
            '__v': PropTypes.number.isRequired
        })
    ).isRequired
};
export default BurgerIngredients;
