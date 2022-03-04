import React from "react";
import styles from "./styles.module.css";
import {Input,  Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {sendForgotPassword} from "../services/actions/forgot-password";

export const ForgotPasswordPage = () => {
    const dispatch = useDispatch();
    const [formEmail, setFormEmail] = React.useState<string>('');

    const {forgot_password_completed, email}:{forgot_password_completed: boolean, email: string} = useSelector((state: any) => state.auth);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(sendForgotPassword(formEmail));
    }

    if (forgot_password_completed) {
        return (
            <Redirect to={'/reset-password'}/>
        )
    }

    if (email) {
        return (<Redirect to="/"/>)
    }
    return (
        <article className={styles.flex}>
            <main className={styles.main}>
                <section className={styles.section}>
                    <form onSubmit={handleSubmit}>
                        <h2 className={`text_type_main-medium bt-6`}>Восстановление пароля</h2>
                        <div className={`mt-6 ${styles.input}`}>
                            <Input
                                name={'email'}
                                placeholder={'Укажите e-mail'}
                                size={'default'}
                                value={formEmail}
                                onChange={e => setFormEmail(e.target.value)}
                            />
                        </div>
                        <div className={'mt-6'}>
                            <Button type="primary" size="medium">
                                Восстановить
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