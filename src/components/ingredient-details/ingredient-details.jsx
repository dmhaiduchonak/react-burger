import React from 'react';
import styles from './styles.module.css';
import PropTypes from 'prop-types';

import Modal from '../modal/modal'

const IngredientDetails = ({ingredient = {}, isOpen , onClose}) => {
    return (
        <React.Fragment>
            {typeof ingredient?._id === 'string' &&
                <Modal title={'Детали ингредиента'} isOpen={isOpen} onClose={onClose}>
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
                </Modal>
            }
        </React.Fragment>
    );
}


IngredientDetails.propTypes = {
    ingredient:  PropTypes.shape({
        '_id': PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        '__v': PropTypes.number
    }),
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default IngredientDetails;