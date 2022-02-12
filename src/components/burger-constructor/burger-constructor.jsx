import React, {useCallback} from 'react';
import styles from './styles.module.css';
import {
    CurrencyIcon,
    Button,
    ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import { useDrop } from "react-dnd";
import { useHistory } from 'react-router-dom';
import {addConstructorItem, removeConstructorItem, moveConstructorItem} from "../../services/actions/constructor";
import {sendOrder, hideOrder} from "../../services/actions/order";
import DraggableElement from "../draggable-element/draggable-element";
import {INGREDIENT} from "../../utils/constants";

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {email} = useSelector((state) => state.auth);
    const {items, bun} = useSelector((state) => state.constructor, shallowEqual);
    const {id, open} = useSelector((state) => state.order);

    const handleModalClose = (event) => {
        dispatch(hideOrder());
    }

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch(moveConstructorItem(dragIndex, hoverIndex));
    }, [dispatch]);

    const [, dropTarget] = useDrop({
        accept: INGREDIENT,
        drop(item) {
            dispatch(addConstructorItem(item));
        },
    });

    const sum = React.useMemo(() => {
        let sum = 0;
        if (bun) {
            sum += bun.price * 2;
        }
        if (items) {
            items.map((item) => {
                return sum += item.price;
            });
        }
        return sum;
    }, [bun, items]);

    const handleOrderSubmit = (e) => {
        if (!email) {
            // redirect to login
            history.replace({ pathname: '/login' });
        }
        const selectedIds = items.map(item => {
            return item._id;
        });
        if (bun._id) {
            selectedIds.push(bun._id);
        }
        dispatch(sendOrder(selectedIds));
    }

    const handleRemoveItem = (item) => {
        dispatch(removeConstructorItem(item));
    }

    const isOrderValid = useCallback( () => {
        return bun && items && items.length>0;
    }, [bun, items]);

    return (<section className={styles.main} ref={dropTarget}>
        {bun &&
            (<div className={`${styles.first} ${styles.item} mb-2 pr-4 ml-2`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>)
        }
        {items &&
            (<ul className={`${styles.middle} custom-scroll pr-4`}>
                {items.map((item, index) => {
                    return (
                        <DraggableElement
                            item={item}
                            key={item.key}
                            index={index}
                            handleClose={() => handleRemoveItem(item)}
                            moveCard={moveCard}
                        />)
                })}
            </ul>)
        }
        {bun &&
            (<div className={`${styles.last} ${styles.item} mt-2 pr-4  ml-2`}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            </div>)
        }

        <div className={`${styles.sum} mt-10 mr-4`}>
                <span className={' text text_type_digits-medium'}>{sum}&nbsp;
                    <CurrencyIcon type="primary"/>
                </span>
            <div className={'ml-10'}><Button type="primary" size="large" disabled={!isOrderValid()} onClick={handleOrderSubmit}>
                Оформить заказ
            </Button></div>
        </div>
        {open && id && (
            <Modal onClose={handleModalClose}>
                <OrderDetails orderId={id}/>
            </Modal>
        )}

    </section>);
}

export default BurgerConstructor;
