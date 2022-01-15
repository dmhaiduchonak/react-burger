import React from 'react';
import AppHeader from '../app-header/app-header'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import styles from './styles.module.css';

const URL = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                    if (data.success) {
                        return setData(data.data);
                    } else {
                        throw new Error('Incorrect API response');
                    }
                }
            )
            .catch((e) => {
                console.log(e);
            })
    }, [])

    return (
        <div>
            <AppHeader/>
            <main className={styles.main}>
                <BurgerIngredients data={data}/>
                <BurgerConstructor data={data}/>
            </main>
        </div>
    );
}

export default App;
