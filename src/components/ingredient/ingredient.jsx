import {useDrag} from "react-dnd";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import React from "react";
import {setCurrentIngredient} from "../../services/actions/ingredients";
import {useDispatch} from 'react-redux';
import IngredientShape from "../../utils/shapes";
import {INGREDIENT} from "../../utils/constants";

const Ingredient = ({item}) => {
    const dispatch = useDispatch();

    const [, dragRef] = useDrag({
        type: INGREDIENT,
        item
    });

    const handleIngredientClick = (item) => {
        dispatch(setCurrentIngredient(item));
    }

    return (
        <li
            className={`${styles.item} ml-4 mb-10`}
            onClick={() => {
                handleIngredientClick(item)
            }}
            ref={dragRef}>
            <Counter count={item.counter || 0} size="default"/>
            <img className={" .ml-4 .mr-4 .mb-1"} src={item.image} alt={item.name}/>
            <span className={styles.goodPriceContainer + ' text text_type_digits-default'}>
                                    {item.price}&nbsp;
                <CurrencyIcon type="primary"/>
                            </span>
            <p className={styles.goodTitle + ' text text_type_main-default'}>{item.name}</p>
        </li>
    )
}

Ingredient.propTypes = {
    items: IngredientShape,
};

export default Ingredient;