import React from 'react';
import styles from './styles.module.css';
import {
    CurrencyIcon,
    Button,
    DragIcon,
    ConstructorElement
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

import IngredientShape from "../../utils/shapes";

const BurgerConstructor = ({data}) => {
    const [open, setOpen] = React.useState(false);

    const handleModalOpen = (event) => {
        setOpen(true);
    }

    const handleModalClose = (event) => {
        setOpen(false);
    }

    const bunItem = data.find(item => item.type === 'bun');
    const itemsList = data.filter(item => item.type !== 'bun');

    return (<section className={styles.main}>
        {bunItem &&
            (<div className={`${styles.first} ${styles.item} mb-2 pr-4 ml-2`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bunItem.name} (верх)`}
                    price={bunItem.price}
                    thumbnail={bunItem.image}
                />
            </div>)
        }
        {itemsList &&
            (<ul className={`${styles.middle} custom-scroll pr-4`}>
                {itemsList.map((item) => {
                    return (
                        <li className={`${styles.item} mr-2`} key={item._id}>
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
        {bunItem &&
            (<div className={`${styles.last} ${styles.item} mt-2 pr-4  ml-2`}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bunItem.name} (низ)`}
                    price={bunItem.price}
                    thumbnail={bunItem.image}

                />
            </div>)
        }

        <div className={`${styles.sum} mt-10 mr-4`}>
                <span className={' text text_type_digits-medium'}>610&nbsp;
                    <CurrencyIcon type="primary"/>
                </span>
            <div className={'ml-10'}><Button type="primary" size="large" onClick={handleModalOpen}>
                Оформить заказ
            </Button></div>
        </div>
        {open && (
            <Modal onClose={handleModalClose}>
                <OrderDetails/>
            </Modal>
        )}

    </section>);
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(IngredientShape).isRequired
};

export default BurgerConstructor;
