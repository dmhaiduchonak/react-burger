import {useDrag} from "react-dnd";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import React from "react";
import IngredientShape from "../../utils/shapes";
import {INGREDIENT} from "../../utils/constants";
import {useLocation, Link} from "react-router-dom";

const Ingredient = ({item}) => {
    const location = useLocation();

    const [, dragRef] = useDrag({
        type: INGREDIENT,
        item
    });
    const ingredientId = item['_id'];

    return (
        <li
            className={`${styles.item} ml-4 mb-10`}
            ref={dragRef}>
            <Link key={ingredientId}
                  className={`text_color_primary`}
                  to={{
                      pathname: `/ingredients/${ingredientId}`,
                      state: {background: location},
                  }}>
                <Counter count={item.counter || 0} size="default"/>
                <img className={" .ml-4 .mr-4 .mb-1"} src={item.image} alt={item.name}/>
                <span className={styles.goodPriceContainer + ' text text_type_digits-default'}>
                                    {item.price}&nbsp;
                    <CurrencyIcon type="primary"/>
                            </span>
                <p className={styles.goodTitle + ' text text_type_main-default'}>{item.name}</p>
            </Link>
        </li>
    )
}

Ingredient.propTypes = {
    item: IngredientShape.isRequired,
};

export default Ingredient;