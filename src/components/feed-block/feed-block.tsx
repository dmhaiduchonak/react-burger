import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./styles.module.css";
import React, {useEffect, useMemo} from "react";
import {useLocation, Link} from "react-router-dom";
import {LocationState, TItem, TOrdersRow} from "../../types";
import {getIngredients} from "../../services/actions/ingredients";
import OrderStatus from "../order-status/order-status";
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import Datetime from "../datetime/datetime";

interface Props {
    feedItem: TOrdersRow;
}

const FeedBlock = ({feedItem}: Props) => {
    const dispatch = useAppDispatch();
    const location = useLocation<LocationState>();

    const {items, request, failed} = useAppSelector(state => state.ingredients);

    useEffect(() => {
        if ((!items || items.length <= 0) && (!request)) dispatch(getIngredients())
    }, [dispatch, items, request, failed]);


    const ingredientsList = useMemo( () => {
        const a = items;
        return a?.filter(ingredient => {
            return feedItem?.ingredients?.includes(ingredient._id)
        });
    }, [items, feedItem]);

    const shortIngredientsList = useMemo( () => {
       return  ingredientsList.slice(0,6);
    }, [ingredientsList]);

    const ingredientsListMoreCount = useMemo( () => {
       return  ingredientsList.length-6;
    }, [ingredientsList]);

    const price = React.useMemo(() => {
        let sum = 0;

        if (ingredientsList) {
            ingredientsList.map((item) => {
                if (item.type === 'bun') {
                    return sum += item.price * 2;

                } else {
                    return sum += item.price;
                }
            });
        }
        return sum;
    }, [ingredientsList]);

    if (!feedItem)
        return (<></>);

    const feedBlockId: string = feedItem['_id'];

    return (
        <li className={`${styles.item} mb-6 pb-6 pl-6 pr-6`}>
            <Link key={feedBlockId}
                  className={`text_color_primary`}
                  to={{
                      pathname: `${location.pathname}/${feedBlockId}`,
                      state: {background: location},
                  }}>
                <div className={`${styles.itemDateContainer} mt-6`}>
                    <span className={'text text_type_digits-default'}>#{feedItem.number}</span>
                    <span
                        className={`${styles.itemDate} text text_type_main-default text_color_inactive`}><Datetime datetime={feedItem.createdAt}/></span>
                </div>
                <p className={`${styles.itemTitle} mt-6 text text_type_main-medium`}>{feedItem.name}</p>
                <OrderStatus status={feedItem.status}/>
                <div className={`${styles.itemListContainer} mt-6`}>
                    <span className={styles.circleContainer}>
            {shortIngredientsList && shortIngredientsList.length && shortIngredientsList.map((ingredient: TItem, index: number) => {

                return (<div key={index} className={styles.circle} style={{zIndex: `${100 - index}`}}>
                    <div className={styles.circleInner} style={{
                        backgroundImage: `url("${ingredient.image}")`
                    }}>
                        {((index === 5) && (ingredientsListMoreCount>0))
                            && (<div
                                    className={`${styles.circleText} text text_type_main-default`}>+{ingredientsListMoreCount}</div>
                            )}
                    </div>
                </div>)
            })
            }
                    </span>
                    <span className={`${styles.itemPriceContainer} text text_type_digits-default`}>
                                    {price}&nbsp;
                        <CurrencyIcon type="primary"/>
                            </span>
                </div>
            </Link>
        </li>
    )
}

export default FeedBlock;