import React from "react";
import styles from "./styles.module.css";
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {sendResetPassword} from "../services/actions/reset-password";
import {useAppDispatch, useAppSelector} from "../utils/hooks";

export const ResetPasswordPage = () => {
    const dispatch = useAppDispatch();

    const [code, setCode] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const {forgot_password_completed, reset_password_completed, email} = useAppSelector(state => state.auth);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(sendResetPassword(password, code));
    }

    if (email) {
        return (<Redirect to="/"/>)
    }

    if (reset_password_completed) {
        return (
            <Redirect to={'/login'}/>
        )
    }

    if (!forgot_password_completed) {
        return (
            <Redirect to={'/forgot-password'}/>
        )
    }


    return (
        <article className={styles.flex}>
            <main className={styles.main}>
                <section className={styles.section}>
                    <form onSubmit={handleSubmit}>
                        <h2 className={`text_type_main-medium bt-6`}>Восстановление пароля</h2>
                        <div className={`mt-6 ${styles.input}`}>
                            <Input
                                type={'password'}
                                name={'password'}
                                placeholder={'Введите новый пароль'}
                                size={'default'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={`mt-6 ${styles.input}`}>
                            <Input
                                name={'code'}
                                placeholder={'Введите код из письма'}
                                size={'default'}
                                value={code}
                                onChange={e => setCode(e.target.value)}
                            />
                        </div>
                        <div className={'mt-6'}>
                            <Button type="primary" size="medium">
                                Войти
                            </Button>
                        </div>
                        <div className={'mt-20 text_type_main-default'}>
                            Вспомнили пароль? <Link to={'/login'}>Войти</Link>
                        </div>
                    </form>
                </section>
            </main>
        </article>
    );
}