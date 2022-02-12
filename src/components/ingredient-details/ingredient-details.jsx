import React, {useMemo, useEffect} from 'react';
import styles from './styles.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getIngredients, } from "../../services/actions/ingredients";
import {useParams, } from "react-router-dom";

const IngredientDetails = () => {
    const dispatch = useDispatch();
    const params = useParams();

    const {items} = useSelector((state) => state.ingredients);

    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch]);

    const ingredient = useMemo(() => {
        const currentId = (params && params.id) ? params.id : null;
        return currentId ? items.filter(item => item._id === currentId)[0] : null;
    }, [params, items]);

    if (!ingredient)
        return (<></>);

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

export default IngredientDetails;