import React, {useMemo, useEffect} from 'react';
import styles from './styles.module.css';
import {getIngredients,} from "../../services/actions/ingredients";
import {useParams,} from "react-router-dom";
import {TItem} from "../../types";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {connect as connectOrdersAll, disconnect as disconnectOrdersAll} from "../../services/actions/orders-all";
import {ORDERS_ALL_SERVER_URL} from "../../utils/constants";
import {useAppDispatch, useAppSelector} from "../../utils/hooks";

type FeedParams = {
    id: string;
};
const FeedItem = () => {
    const dispatch = useAppDispatch();
    const params = useParams<FeedParams>();

    const {items} = useAppSelector(state => state.ingredients);
    const {orders} = useAppSelector(state => state.ordersAll);

    useEffect(() => {
        if (!items || items.length <= 0) dispatch(getIngredients())
        dispatch(connectOrdersAll(`${ORDERS_ALL_SERVER_URL}`));

        return () => {
            dispatch(disconnectOrdersAll())
        }
    }, [dispatch, items]);

    const item = useMemo(() => {
        if (!orders || orders.length <= 0) return null;
        return orders.filter(o => {
            return o._id === params.id;
        })[0];
    }, [orders, params])

    const ingredientsList = useMemo(() => {
        if (!items || items.length <= 0) return null;
        if (!item) return null;
        return items.filter(ingredient => {
            return item?.ingredients?.includes(ingredient._id)
        });
    }, [items, item]);

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

    if (!item)
        return (<></>);

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

                        <p className={styles.goodTitle + ' ml-4 text text_type_main-default'}>{item.name}</p>
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