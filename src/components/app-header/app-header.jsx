import React from 'react';
import styles from './styles.module.css';

import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
    return (
        <header className={styles.main}>
            <nav className={styles.nav}>
                <a className={`${styles.section} pl-5 mt-4`}>
                    <BurgerIcon type="primary"/>
                    <span className="pl-2 pr-5 text text_type_main-default">Конструктор</span>
                </a>
                <a className={`${styles.section} ml-2 pl-5 mt-4`}>
                    <ListIcon type="secondary"/>
                    <span className="pl-2 pr-5 text text_type_main-default text_color_inactive">Лента заказов</span>
                </a>
            </nav>
            <div className={styles.logo}>
                <Logo/>
            </div>
            <a className={styles.profile}>
                <ProfileIcon type="secondary"/>
                <span className="pl-2 pr-5 text text_type_main-default text_color_inactive">Личный кабинет</span>
            </a>
        </header>
    );
}

export default AppHeader;