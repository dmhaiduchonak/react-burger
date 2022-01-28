import React, {useCallback, useEffect, useRef} from 'react';
import styles from './styles.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {getIngredients, setCurrentIngredient, setIngredientsCurrentTab} from '../../services/actions/ingredients';
import Ingredient from "../ingredient/ingredient";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";

const BurgerIngredients = () => {
    const {items, currentTab} = useSelector((state) => state.ingredients);
    const currentIngredient = useSelector((state) => state.currentIngredient);
    const dispatch = useDispatch();

    const inputRefBun = useRef();
    const inputRefSauce = useRef();
    const inputRefMain = useRef();

    const scrollHandler = useCallback((e) => {
        const bun = inputRefBun.current.getBoundingClientRect();
        const sauce = inputRefSauce.current.getBoundingClientRect();
        const main = inputRefMain.current.getBoundingClientRect();
        const obj = {
            bun: bun.y,
            sauce: sauce.y,
            main: main.y
        };
        const key = Object.keys(obj).reduce((key, v) => Math.abs(obj[v]) < Math.abs(obj[key]) ? v : key);
        dispatch(setIngredientsCurrentTab(key));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getIngredients())

        window.addEventListener("scroll", scrollHandler, true);
        return () => {
            window.removeEventListener("scroll", scrollHandler, true);
        };
    }, [dispatch, scrollHandler]);


    const handleModalClose = (event) => {
        dispatch(setCurrentIngredient(null));
    }

    const bunList = items.filter(item => item.type === 'bun');
    const sauceList = items.filter(item => item.type === 'sauce');
    const mainList = items.filter(item => item.type === 'main');

    return (
        <section className={styles.main}>
            <h2 className={`mt-10 mb-5 text text_type_main-large`}>Соберите бургер</h2>
            <ul className={`${styles.container} mb-10`}>
                <li>
                    <Tab value="bun" active={currentTab === 'bun'}>
                        Булки
                    </Tab>
                </li>
                <li>
                    <Tab value="sauce" active={currentTab === 'sauce'}>
                        Соусы
                    </Tab>
                </li>
                <li>
                    <Tab value="main" active={currentTab === 'main'}>
                        Начинки
                    </Tab>
                </li>
            </ul>

            <ul className={`${styles.list} custom-scroll`} ref={inputRefBun}>
                <li className={`${styles.typeTitle} ml-4 mr-4`}>
                    <h3 className={`mb-6 text text_type_main-medium`}>Булки</h3>
                </li>
                {bunList.map((item) => {
                    return (
                        <Ingredient key={`${item._id}`} item={item}/>
                    )
                })}
                <li className={`${styles.typeTitle} ml-4 mr-4`} ref={inputRefSauce}>
                    <h3 className={"mb-6 text text_type_main-medium"}>Соусы</h3>
                </li>
                {sauceList.map((item) => {
                    return (
                        <Ingredient key={`${item._id}`} item={item}/>
                    )
                })}
                <li className={`${styles.typeTitle} ml-4 mr-4`} ref={inputRefMain}>
                    <h3 className={"mb-6 text text_type_main-medium"}>Начинки</h3>
                </li>
                {mainList.map((item) => {
                    return (
                        <Ingredient key={`${item._id}`} item={item}/>
                    )
                })}

            </ul>
            {currentIngredient && (
                <Modal title={'Детали ингредиента'} onClose={handleModalClose}>
                    <IngredientDetails ingredient={currentIngredient}/>
                </Modal>
            )}
        </section>
    );
}

export default BurgerIngredients;
