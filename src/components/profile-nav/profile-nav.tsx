import React from 'react';
import styles from './styles.module.css';

import {NavLink} from "react-router-dom";

const ProfileNav: React.FC = () => {
    return (
        <nav className={'mt-6'}>
            <ul id="menu" className={styles.profileMenu}>
                <li role="none">
                    <NavLink role="menuitem"
                             to={'/profile'}
                             exact={true}
                             tabIndex={0}
                             className={isActive =>
                                 'text text_type_main-medium ' + (!isActive ? " text_color_inactive" : "text_color_primary")}
                    >
                        Профиль
                    </NavLink>
                </li>
                <li role="none">
                    <NavLink role="menuitem"
                             to={'/profile/orders'}
                             tabIndex={1}
                             className={isActive =>
                                 'text text_type_main-medium ' + (!isActive ? " text_color_inactive" : "text_color_primary")}
                    >
                        История заказов
                    </NavLink>
                </li>
                <li role="none">
                    <NavLink role="menuitem"
                             to={'/logout'}
                             className={isActive =>
                                 'text text_type_main-medium ' + (!isActive ? " text_color_inactive" : "text_color_primary")}
                             tabIndex={2}
                    >
                        Выход
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default ProfileNav;