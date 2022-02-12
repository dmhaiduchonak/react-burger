import React from "react";
import styles from "./styles.module.css";
import {Input, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {sendRegistration} from "../services/actions/registration";

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const {email} = useSelector((state) => state.auth);

    const [formName, setFormName] = React.useState('');
    const [formEmail, setFormEmail] = React.useState('');
    const [formPassword, setFormPassword] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(sendRegistration(formEmail, formPassword, formName));
    }

    if (email) {
        return (<Redirect to="/"/>)
    }
    return (
        <article className={styles.flex}>
            <main className={styles.main}>
                <section className={styles.section}>
                    <form onSubmit={handleSubmit}>

                        <h2 className={`text_type_main-medium bt-6`}>Регистрация</h2>
                        <div className={`mt-6`}>
                            <Input
                                type={'text'}
                                placeholder={'Имя'}
                                name={'name'}
                                error={false}
                                errorText={'Ошибка'}
                                size={'default'}
                                value={formName}
                                onChange={e => setFormName(e.target.value)}
                            /></div>
                        <div className={'mt-6'}>
                            <Input
                                name={'email'}
                                placeholder={'E-mail'}
                                size={'default'}
                                value={formEmail}
                                onChange={e => setFormEmail(e.target.value)}
                            />
                        </div>
                        <div className={'mt-6'}>
                            <PasswordInput
                                name={'password'}
                                size={'default'}
                                value={formPassword}
                                onChange={e => setFormPassword(e.target.value)}
                            />
                        </div>
                        <div className={'mt-6'}>
                            <Button type="primary" size="medium">
                                Зарегистрироваться
                            </Button>
                        </div>
                        <div className={'mt-20 text_type_main-default'}>
                            Уже зарегистрированы? <Link to={'/login'}>Войти</Link>
                        </div>
                    </form>

                </section>
            </main>
        </article>
    );
}