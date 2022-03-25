import React, {useEffect} from "react";
import styles from "./styles.module.css";
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {saveProfile} from "../services/actions/profile";
import ProfileNav from "../components/profile-nav/profile-nav";
import {useAppDispatch, useAppSelector} from "../utils/hooks";

export const ProfilePage = () => {
    const dispatch = useAppDispatch();

    const [formName, setFormName] = React.useState<string>('');
    const [formEmail, setFormEmail] = React.useState<string>('');
    const [formPassword, setFormPassword] = React.useState<string>('');
    const [formIsEdited, setFormIsEdited] = React.useState<boolean>(false);
    const nameRef = React.useRef<HTMLInputElement>(null);
    const emailRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);

    const {name, email} = useAppSelector(state => state.auth);

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
                    <ProfileNav/>
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