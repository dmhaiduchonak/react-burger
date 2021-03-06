import React from 'react';
import styles from './styles.module.css';

import {NavLink, Link} from "react-router-dom";

import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader: React.FC = () => {
    return (
        <div className={styles.container}>
        <header className={styles.main}>
            <nav className={styles.nav}>
                <NavLink exact={true} to={'/'}
                         className={isActive =>
                             `${styles.section} mt-4 ` + (!isActive ? " text_color_inactive" : "text_color_primary")}>
                    < BurgerIcon type="primary"/>
                    <span className="pl-2 pr-5 text text_type_main-default ">Конструктор</span>
                </NavLink>
                <NavLink to={'/feed'}
                         className={isActive =>
                             `${styles.section} ml-2 pl-5 mt-4 ` + (!isActive ? " text_color_inactive" : "text_color_primary")}>
                    <ListIcon type="secondary"/>
                    <span className="pl-2 pr-5 text text_type_main-default">Лента заказов</span>
                </NavLink>
            </nav>
            <div className={styles.logo}>
                <Link to="/">
                    <Logo/>
                </Link>
            </div>
            <NavLink to={'/profile'}
                     className={isActive =>
                         `${styles.profile} ` + (!isActive ? " text_color_inactive" : "text_color_primary")}>
                <ProfileIcon type="secondary"/>
                <span className="pl-2 text text_type_main-default ">Личный кабинет</span>
            </NavLink>
        </header>
        </div>
    );
}

export default AppHeader;