import React, {useEffect} from "react";
import styles from "./styles.module.css";
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {saveProfile} from "../services/actions/profile";

export const ProfilePage = () => {
    const dispatch = useDispatch();

    const [formName, setFormName] = React.useState<string>('');
    const [formEmail, setFormEmail] = React.useState<string>('');
    const [formPassword, setFormPassword] = React.useState<string>('');
    const [formIsEdited, setFormIsEdited] = React.useState<boolean>(false);
    const nameRef = React.useRef<HTMLInputElement>(null);
    const emailRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);

    const {name, email}:{name: string, email: string} = useSelector((state:any) => state.auth);

    useEffect(() => {
        name && setFormName(name);
        email && setFormEmail(email);
    }, [name, email])

    const handleCancel = () => {
        name && setFormName(name);
        email && setFormEmail(email);
        setFormIsEdited(false);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(saveProfile(formEmail, formName, formPassword));
        setFormIsEdited(false);
    }

    return (
        <article className={styles.flex}>
            <main className={styles.main}>
                <section className={styles.section}>
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
                    <form className={styles.profileForm} onSubmit={handleSubmit}>
                        <div className={`mt-6 ${styles.input}`}>
                            <Input
                                ref={nameRef}
                                name={'name'}
                                placeholder={'Имя'}
                                size={'default'}
                                value={formName}
                                icon={'EditIcon'}
                                onChange={e => setFormName(e.target.value)}
                                onFocus={e => setFormIsEdited(true)}
                            />
                        </div>

                        <div className={`mt-6 ${styles.input}`}>
                            <Input
                                ref={emailRef}
                                name={'email'}
                                type={'email'}
                                placeholder={'Логин'}
                                size={'default'}
                                value={formEmail}
                                icon={'EditIcon'}
                                onChange={e => setFormEmail(e.target.value)}
                                onFocus={e => setFormIsEdited(true)}

                            />
                        </div>

                        <div className={`mt-6 ${styles.input}`}>
                            <Input
                                ref={passwordRef}
                                name={'password'}
                                placeholder={'Введите новый пароль'}
                                size={'default'}
                                value={formPassword}
                                icon={'EditIcon'}
                                onChange={e => setFormPassword(e.target.value)}
                                onFocus={e => setFormIsEdited(true)}

                            />
                        </div>
                        {formIsEdited &&
                            <div className={'mt-6'}>
                                <Button type="secondary" size="medium" onClick={handleCancel}>
                                    Отмена
                                </Button>
                                <Button type="primary" size="medium">
                                    Сохранить
                                </Button>
                            </div>
                        }
                    </form>
                </section>
            </main>
        </article>
    );
}