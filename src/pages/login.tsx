import React, {useEffect} from "react";
import styles from "./styles.module.css";
import {Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useLocation} from "react-router-dom";
import {sendLogin} from "../services/actions/login";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../services/actions/profile";
import { Location } from 'history';

type LocationState = {
    from: Location;
};


export const LoginPage = () => {
    const dispatch = useDispatch();
    const location = useLocation<LocationState>();

    const [formEmail, setFormEmail] = React.useState<string>('');
    const [formPassword, setFormPassword] = React.useState<string>('');

    const {email, is_login_completed}:{email: string, is_login_completed: boolean} = useSelector((state:any) => state.auth);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(sendLogin(formEmail, formPassword));
    }

    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch]);

    if (!is_login_completed) {
        return null;
    }

    if (email) {
        return (<Redirect to={ location.state?.from || '/' } />)
    }

    return (
        <article className={styles.flex}>
            <main className={styles.main}>
                <section className={styles.section}>
                    <form onSubmit={handleSubmit}>
                        <h2 className={`text_type_main-medium bt-6`}>Вход</h2>
                        <div className={`mt-6 ${styles.input}`}>
                            <Input
                                name={'email'}
                                placeholder={'E-mail'}
                                size={'default'}
                                value={formEmail}
                                onChange={e => setFormEmail(e.target.value)}
                            />
                        </div>
                        <div className={`mt-6 ${styles.input}`}>
                            <PasswordInput
                                name={'password'}
                                size={'default'}
                                value={formPassword}
                                onChange={e => setFormPassword(e.target.value)}
                            />
                        </div>
                        <div className={'mt-6'}>
                            <Button type="primary" size="medium">
                                Войти
                            </Button>
                        </div>
                        <div className={'mt-20 text_type_main-default'}>
                            Вы новый пользователь? <Link to={'/register'}>Зарегистрироваться</Link>
                        </div>
                        <div className={'mt-4 text_type_main-default'}>
                            Забыли пароль? <Link to={'/forgot-password'}>Восстановить пароль</Link>
                        </div>
                    </form>

                </section>
            </main>
        </article>
    )
}