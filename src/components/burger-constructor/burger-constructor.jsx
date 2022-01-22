import React from 'react';
import {nanoid} from 'nanoid';
import styles from './styles.module.css';
import {
    CurrencyIcon,
    Button,
    DragIcon,
    ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

import {BurgerContext} from "../../utils/burger-context";
import {API_URL} from "../../utils/constants";
import {ErrorContext} from "../../utils/error-context";


const BurgerConstructor = () => {
    const [data] = React.useContext(BurgerContext);
    const [error, setError] = React.useContext(ErrorContext);
    const [open, setOpen] = React.useState(false);
    const [orderId, setOrderId] = React.useState();

    const handleModalClose = (event) => {
        setOpen(false);
    }

    const init = (initial) => {
        return {
            sum: 0,
            items: [],
            bun: null,
        };
    }

    const burgerReducer = (state, action) => {
        switch (action.type) {
            case 'add':
                action.payload.key = nanoid();
                if (action.payload.type === 'bun') {
                    return {
                        sum: state.bun ? state.sum + (action.payload.price * 2) - (state.bun * 2) : state.sum + (action.payload.price * 2),
                        items: state.items,
                        bun: action.payload,
                    };
                }
                return {
                    sum: state.sum + action.payload.price,
                    items: [...state.items, action.payload],
                    bun: state.bun,
                };
            case 'remove':
                if (action.payload.type === 'bun') {
                    return {
                        sum: state.sum - (action.payload.price * 2),
                        items: state.items,
                        bun: null,
                    };
                } else {
                    return {
                        sum: state.sum - action.payload.price,
                        items: state.items.filter(item => item.key !== action.payload.key),
                        bun: state.bun,
                    };
                }
            case 'reset':
                return {sum: 0, bun: null, items: []};
            default:
                throw new Error();
        }
    }

    const [burgers, dispatchBurgerItems] = React.useReducer(burgerReducer, {
        sum: 0,
        items: [],
        bun: null,
    }, init);

    React.useEffect(() => {
        let bunItem = data.find(item => item.type === 'bun');
        let itemsList = data.filter(item => item.type !== 'bun');

        if (bunItem) {
            dispatchBurgerItems({type: 'add', payload: bunItem});
        }

        if (itemsList) {
            itemsList.map((item) => {
                return dispatchBurgerItems({type: 'add', payload: item});
            });
        }
    }, [data]);


    const handleOrderSubmit = (e) => {
        let selectedIds = burgers.items.map(item =>
        {
            return  item._id;
        });
        selectedIds.push(burgers.bun._id);

        fetch(API_URL + 'orders', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"ingredients": selectedIds})
        })
            .then(response => {
                if (response.ok) {
                    return response;
                }
                throw Error(`${response.status} ${response.statusText}`);
            })
            .then((response) => response.json())
            .then((data) => {
                    if (data.success && data.order && data.order.number) {
                        setOrderId(data.order.number);
                        return setOpen(true);
                    } else {
                        throw new Error('Плохой ответ от АПИ');
                    }
                }
            )
            .catch((e) => {
                setError(e.message);
            })
    }

    return (<section className={styles.main}>
        {burgers.bun &&
            (<div className={`${styles.first} ${styles.item} mb-2 pr-4 ml-2`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${burgers.bun.name} (верх)`}
                    price={burgers.bun.price}
                    thumbnail={burgers.bun.image}
                />
            </div>)
        }
        {burgers.items &&
            (<ul className={`${styles.middle} custom-scroll pr-4`}>
                {burgers.items.map((item) => {
                    return (
                        <li className={`${styles.item} mr-2`} key={item.key}>
                            <DragIcon/>
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </li>)
                })}
            </ul>)
        }
        {burgers.bun &&
            (<div className={`${styles.last} ${styles.item} mt-2 pr-4  ml-2`}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${burgers.bun.name} (низ)`}
                    price={burgers.bun.price}
                    thumbnail={burgers.bun.image}

                />
            </div>)
        }

        <div className={`${styles.sum} mt-10 mr-4`}>
                <span className={' text text_type_digits-medium'}>{burgers.sum}&nbsp;
                    <CurrencyIcon type="primary"/>
                </span>
            <div className={'ml-10'}><Button type="primary" size="large" onClick={handleOrderSubmit}>
                Оформить заказ
            </Button></div>
        </div>
        {open && orderId && (
            <Modal onClose={handleModalClose}>
                <OrderDetails orderId={orderId}/>
            </Modal>
        )}

    </section>);
}

export default BurgerConstructor;
