import React from 'react';
import AppHeader from '../app-header/app-header'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import styles from './styles.module.css';
import Modal from "../modal/modal";
import {BurgerContext} from "../../utils/burger-context";
import {ErrorContext} from "../../utils/error-context";
import {API_URL} from "../../utils/constants";


const App = () => {
    const [data, setData] = React.useState([]);
    const [burger, setBurger] = React.useState([]);
    const [error, setError] = React.useState(false);

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
                        setBurger([data.data[0],
                            data.data[2],
                            data.data[3],
                            data.data[4]
                        ]);
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
        <ErrorContext.Provider value={[error, setError]}>
        <BurgerContext.Provider value={[burger]}>
            <article className={styles.flex}>
                <AppHeader/>
                {error &&
                    (
                        <Modal title={'Произошла ошибка'} onClose={() => setError(null)}>
                            <p className={`text text_type_main-default mb-30`}>{error}</p>
                        </Modal>
                    )
                }
                <main className={styles.main}>
                    <BurgerIngredients data={data}/>
                    <BurgerConstructor/>
                </main>
            </article>
        </BurgerContext.Provider>
        </ErrorContext.Provider>
    );
}

export default App;
