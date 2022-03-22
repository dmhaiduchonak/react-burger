import React, {useEffect} from 'react';
import styles from './styles.module.css';
import {getIngredients} from "../../services/actions/ingredients";
import {TItem, TOrdersRow} from "../../types";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppDispatch, useAppSelector} from "../../utils/hooks";

type Props = {
    item: TOrdersRow
}

const FeedItem = ({item}: Props) => {
    const dispatch = useAppDispatch();

    const {items, request, failed} = useAppSelector(state => state.ingredients);

    useEffect(() => {
        if (!items || items.length <= 0) dispatch(getIngredients())
    }, [dispatch, items, request, failed]);

    const ingredientsList = items?.filter(ingredient => {
        return item?.ingredients?.includes(ingredient._id)
    });

    const price = React.useMemo(() => {
        let sum = 0;
        if (ingredientsList) {
            ingredientsList.map((item) => {
                if (item.type === 'bun') {
                    return sum += item.price*2;

                } else {
                    return sum += item.price;
                }
            });
        }
        return sum;
    }, [ingredientsList]);

    return (
        <section className={`${styles.content}  mr-10 ml-10 mb-10`}>
            <p className={`text text_type_digits-default`}>{item.number}</p>
            <p className={`text text_type_main-medium mt-10`}>{item.name}</p>
            <p className={`text text_type_main-default text_color_success mt-3`}>Выполнен</p>
            <h3 className={`${styles.feedTitle} text text_type_main-medium mt-15`}>Состав:</h3>
            <ul className={`${styles.properties} text text_type_main-default custom-scroll`}>
                {ingredientsList && ingredientsList.length && ingredientsList.map((ingredientItem: TItem, index:number) => {
                    return (<li key={index} className={`${styles.ingredientContainer} pr-6 mt-6`}>

                        <div className={`${styles.circle}`}><div className={styles.circle_inner} style={{
                            backgroundImage: `url("${ingredientItem.image}")`
                        }}>&nbsp;</div></div>

                        <p className={styles.goodTitle + ' ml-4 text text_type_main-default'}>{ingredientItem.name}</p>
                        <span className={styles.goodPriceContainer + ' text text_type_digits-default'}>
                                    1&nbsp;x&nbsp;{ingredientItem.price}&nbsp;
                            <CurrencyIcon type="primary"/>
                            </span>
                    </li>)
                })}
            </ul>
            <div className={`${styles.footerContainer} mt-10`}>
                <span className={`${styles.date} text text_type_main-default text_color_inactive`}>{item.createdAt}</span>
                <span className={`${styles.goodPriceContainer} text text_type_digits-default`}>
                                    {price}&nbsp;
                    <CurrencyIcon type="primary"/>
                            </span>
            </div>
        </section>
    );
}

export default FeedItem;