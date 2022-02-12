import React, {useCallback, useEffect, useRef} from 'react';
import styles from './styles.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {getIngredients, setIngredientsCurrentTab} from '../../services/actions/ingredients';
import Ingredient from "../ingredient/ingredient";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = () => {
    const {items, currentTab} = useSelector((state) => state.ingredients);
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


    const handleTabCLickBun = (event) => {
        inputRefBun.current.scrollIntoView({behavior: 'smooth'});
        dispatch(setIngredientsCurrentTab('bun'));
    }
    const handleTabCLickSauce = (event) => {
        inputRefSauce.current.scrollIntoView({behavior: 'smooth'});
        dispatch(setIngredientsCurrentTab('sauce'));
    }
    const handleTabCLickMain = (event) => {
        inputRefMain.current.scrollIntoView({behavior: 'smooth'});
        dispatch(setIngredientsCurrentTab('main'));
    }

    const bunList = items.filter(item => item.type === 'bun');
    const sauceList = items.filter(item => item.type === 'sauce');
    const mainList = items.filter(item => item.type === 'main');

    return (
        <section className={styles.main}>
            <h2 className={`mt-10 mb-5 text text_type_main-large`}>Соберите бургер</h2>
            <ul className={`${styles.container} mb-10`}>
                <li>
                    <Tab value="bun" active={currentTab === 'bun'} onClick={handleTabCLickBun}>
                        Булки
                    </Tab>
                </li>
                <li>
                    <Tab value="sauce" active={currentTab === 'sauce'} onClick={handleTabCLickSauce}>
                        Соусы
                    </Tab>
                </li>
                <li>
                    <Tab value="main" active={currentTab === 'main'} onClick={handleTabCLickMain}>
                        Начинки
                    </Tab>
                </li>
            </ul>

            <ul className={`${styles.list} custom-scroll`}>
                <li className={`${styles.typeTitle} ml-4 mr-4`} ref={inputRefBun}>
                    <h3 className={`mb-6 text text_type_main-medium`}>Булки</h3>
                </li>
                {bunList && bunList.length && bunList.map((item) => {
                    return item &&
                        <Ingredient key={`${item._id}`} item={item}/>

                })}
                <li className={`${styles.typeTitle} ml-4 mr-4`} ref={inputRefSauce}>
                    <h3 className={"mb-6 text text_type_main-medium"}>Соусы</h3>
                </li>
                {sauceList && sauceList.length && sauceList.map((item) => {
                    return item &&
                        <Ingredient key={`${item._id}`} item={item}/>

                })}
                <li className={`${styles.typeTitle} ml-4 mr-4`} ref={inputRefMain}>
                    <h3 className={"mb-6 text text_type_main-medium"}>Начинки</h3>
                </li>
                {mainList && mainList.length && mainList.map((item) => {
                    return item &&
                        <Ingredient key={`${item._id}`} item={item}/>
                })}
            </ul>
        </section>
    );
}

export default BurgerIngredients;
