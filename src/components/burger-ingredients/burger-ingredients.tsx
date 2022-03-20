import React, {useCallback, useEffect, useRef} from 'react';
import styles from './styles.module.css';
import {getIngredients, setIngredientsCurrentTab} from '../../services/actions/ingredients';
import Ingredient from "../ingredient/ingredient";
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {useAppDispatch, useAppSelector} from "../../utils/hooks";

const BurgerIngredients: React.FC = () => {
    const {items, currentTab} = useAppSelector(state => state.ingredients);
    const dispatch = useAppDispatch();

    const inputRefBun = useRef<HTMLLIElement>(null);
    const inputRefSauce = useRef<HTMLLIElement>(null);
    const inputRefMain = useRef<HTMLLIElement>(null);

    const scrollHandler = useCallback((e: Event) => {
        const bun = inputRefBun?.current?.getBoundingClientRect();
        const sauce = inputRefSauce?.current?.getBoundingClientRect();
        const main = inputRefMain?.current?.getBoundingClientRect();
        const obj:{[key: string]: number } = {
            bun: bun?.y || 0,
            sauce: sauce?.y || 0,
            main: main?.y  || 0
        };
        const key = Object.keys(obj).reduce((key: string, v: string) => Math.abs(obj[v]) < Math.abs(obj[key]) ? v : key);
        dispatch(setIngredientsCurrentTab(key));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getIngredients())

        window.addEventListener("scroll", scrollHandler, true);
        return () => {
            window.removeEventListener("scroll", scrollHandler, true);
        };
    }, [dispatch, scrollHandler]);


    const handleTabCLickBun = (event: string) => {
        inputRefBun?.current?.scrollIntoView({behavior: 'smooth'});
        dispatch(setIngredientsCurrentTab('bun'));
    }
    const handleTabCLickSauce = (event: string) => {
        inputRefSauce?.current?.scrollIntoView({behavior: 'smooth'});
        dispatch(setIngredientsCurrentTab('sauce'));
    }
    const handleTabCLickMain = (event: string) => {
        inputRefMain?.current?.scrollIntoView({behavior: 'smooth'});
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
