import React from 'react';
import styles from './styles.module.css';

import IngredientShape from "../../utils/shapes";

const IngredientDetails = ({ingredient}) => {
    return (
        <section className={`${styles.content} mb-15 mt-10 mr-10 ml-10`}>

            <img className={styles.img} src={ingredient.image_large} alt={ingredient.name}/>
            <p className={`text text_type_main-medium mt-4 mb-8`}>{ingredient.name}</p>
            <ul className={`${styles.properties} text text_type_main-default text_color_inactive`}>
                <li><p>Калории, ккал</p><p
                    className={`text_type_digits-default`}>{ingredient.calories}</p></li>
                <li className={`ml-5 `}><p>Белки, г</p><p
                    className={`text_type_digits-default`}>{ingredient.proteins}</p></li>
                <li className={`ml-5`}><p>Жиры, г</p><p
                    className={`text_type_digits-default`}>{ingredient.fat}</p></li>
                <li className={`ml-5`}><p>Углеводы, г</p><p
                    className={`text_type_digits-default`}>{ingredient.carbohydrates}</p></li>
            </ul>
        </section>
    );
}

IngredientDetails.propTypes = {
    ingredient: IngredientShape.isRequired,
};

export default IngredientDetails;