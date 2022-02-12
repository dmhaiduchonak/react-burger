import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import {DndProvider} from "react-dnd";
import React from "react";
import styles from "./styles.module.css";

export const IndexPage = () => {
    return (
            <article className={styles.flex}>
                <main className={styles.index}>

                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </DndProvider>

                </main>
            </article>
    );
}