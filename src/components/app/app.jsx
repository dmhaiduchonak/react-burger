import React from 'react';
import AppHeader from '../app-header/app-header'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import styles from './styles.module.css';
import Modal from "../modal/modal";

const API_URL = 'https://norma.nomoreparties.space/api/';

const App = () => {
    const [data, setData] = React.useState([]);
    const [error, setError] = React.useState();

    React.useEffect(() => {
        fetch(API_URL + 'ingredients')
            .then(response => {
                if (response.ok) {
                    return response;
                }
                throw Error(`${response.status} ${response.statusText}`);
            })
            .then((response) => response.json())
            .then((data) => {
                    if (data.success) {
                        return setData(data.data);
                    } else {
                        throw new Error('Плохой ответ от АПИ');
                    }
                }
            )
            .catch((e) => {
                setError(e.message);
            })
    }, [])

    return (
        <article className={styles.flex}>
            <AppHeader/>
            {error &&
                (
                    <Modal title={'Произошла ошибка'} onClose={()=>setError(null)}>
                        <p className={`text text_type_main-default mb-30`}>{error}</p>
                    </Modal>
                )
            }
            <main className={styles.main}>
                <BurgerIngredients data={data}/>
                <BurgerConstructor data={data}/>
            </main>
        </article>
    );
}

export default App;
