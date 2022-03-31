import React, {useMemo, useEffect} from 'react';
import styles from './styles.module.css';
import {getIngredients, } from "../../services/actions/ingredients";
import {useParams, } from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../utils/hooks";

type IngredientParams = {
  id: string;
};
const IngredientDetails = () => {
    const dispatch = useAppDispatch();
    const params = useParams<IngredientParams>();

    const {items} = useAppSelector(state => state.ingredients);

    useEffect(() => {
        if (!items || items.length<=0) dispatch(getIngredients())
    }, [dispatch, items]);

    const ingredient = useMemo(() => {
        if (!items || items.length<=0) return null;
        const currentId: string|null = (params && params.id) ? params.id : null;
        return currentId ? items.filter(item => item._id === currentId)[0] : null;
    }, [params, items]);

    if (!ingredient)
        return (<></>);

    return (
            <section className={`${styles.content} mb-15 mt-10 mr-10 ml-10`} data-testid={'ingredient-info'}>
                <img className={styles.img} src={ingredient.image_large} alt={ingredient.name} data-testid={'ingredient-info-image'}/>
                <p className={`text text_type_main-medium mt-4 mb-8`} data-testid={'ingredient-info-name'}>{ingredient.name}</p>
                <ul className={`${styles.properties} text text_type_main-default text_color_inactive`}>
                    <li><p>Калории, ккал</p><p
                        className={`text_type_digits-default`} data-testid={'ingredient-info-calories'}>{ingredient.calories}</p></li>
                    <li className={`ml-5 `}><p>Белки, г</p><p
                        className={`text_type_digits-default`} data-testid={'ingredient-info-proteins'}>{ingredient.proteins}</p></li>
                    <li className={`ml-5`}><p>Жиры, г</p><p
                        className={`text_type_digits-default`} data-testid={'ingredient-info-fat'}>{ingredient.fat}</p></li>
                    <li className={`ml-5`}><p>Углеводы, г</p><p
                        className={`text_type_digits-default`} data-testid={'ingredient-info-carbohydrates'}>{ingredient.carbohydrates}</p></li>
                </ul>
            </section>
    );
}

export default IngredientDetails;