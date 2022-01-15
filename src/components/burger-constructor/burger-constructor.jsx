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

const BurgerConstructor = ({data}) => {
    const [open, setOpen] = React.useState(false);

    const handleModalOpen = (event) => {
        setOpen(true);
    }

    const handleModalClose = (event) => {
        setOpen(false);
    }

    return (<section className={styles.main}>
        <div className={`${styles.first} ${styles.item} mb-2 pr-4 ml-2`}>
            <ConstructorElement
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={200}
                thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
            />
        </div>
        <ul className={`${styles.middle} custom-scroll pr-4`}>
            {data.filter(item => item.type !== 'bun').map((item, i) => {
                return (<li className={`${styles.item} mr-2`} key={item._id}>
                    <DragIcon/>
                    <ConstructorElement
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                    />
                </li>)
            })}
        </ul>
        <div className={`${styles.last} ${styles.item} mt-2 pr-4  ml-2`}>
            <ConstructorElement
                type="bottom"
                isLocked={true}
                text="Краторная булка N-200i (низ)"
                price={200}
                thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
            />
        </div>

        <div className={`${styles.sum} mt-10 mr-4`}>
                <span className={' text text_type_digits-medium'}>610&nbsp;
                    <CurrencyIcon type="primary"/>
                </span>
            <div className={'ml-10'}><Button type="primary" size="large" onClick={handleModalOpen}>
                Оформить заказ
            </Button></div>
        </div>
        <OrderDetails isOpen={open} onClose={handleModalClose}/>

    </section>);
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        '_id': PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        '__v': PropTypes.number.isRequired
    })).isRequired
};

export default BurgerConstructor;
