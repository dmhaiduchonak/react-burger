import React from 'react';
import AppHeader from '../app-header/app-header'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import data from '../../utils/data';

function App() {
    return (
        <div>
            <AppHeader/>
            <main style={{display: 'flex', width: '100%', 'align-items': 'top', 'justify-content': 'center'}}>
                <BurgerIngredients data={data}/>
                <BurgerConstructor data={data}/>
            </main>
        </div>
    );
}

export default App;
