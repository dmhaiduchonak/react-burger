import React from 'react';
import {BrowserRouter as Router, Route, Switch, useLocation, useHistory} from 'react-router-dom';
import {IndexPage} from "../../pages";
import {LoginPage} from "../../pages/login";
import {LogoutPage} from "../../pages/logout";
import {RegisterPage} from "../../pages/register";
import {ForgotPasswordPage} from "../../pages/forgot-password";
import {ResetPasswordPage} from "../../pages/reset-password";
import {ProfilePage} from "../../pages/profile";
import ProtectedRoute from "../protected-route/protected-route";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import AppHeader from "../app-header/app-header";
import NotFound404 from "../not-found-404/not-found-404";
import {useDispatch} from "react-redux";
import {resetCurrentIngredient} from "../../services/actions/ingredients";
import {LocationState} from "../../types";
import FeedItem from "../feed-item/feed-item";
import {FeedPage} from "../../pages/feed";
import {OrdersPage} from "../../pages/orders";
import styles from './styles.module.css';


const App: React.FC = () => {
    const ModalSwitch = () => {
        const dispatch = useDispatch();
        const location = useLocation<LocationState>();
        const history = useHistory();
        const background = location.state && location.state.background;

        const handleModalClose = () => {
            dispatch(resetCurrentIngredient());
            history.goBack();
        };

        const handleFeedModalClose = () => {
            history.goBack();
        };

        return (
            <>
                <AppHeader/>
                <Switch location={background || location}>

                    <Route path="/login">
                        <LoginPage/>
                    </Route>
                    <Route path="/logout">
                        <LogoutPage/>
                    </Route>
                    <Route path="/register">
                        <RegisterPage/>
                    </Route>
                    <Route path="/forgot-password">
                        <ForgotPasswordPage/>
                    </Route>
                    <Route path="/reset-password">
                        <ResetPasswordPage/>
                    </Route>
                    <Route path="/feed" exact={true}>
                        <FeedPage/>
                    </Route>
                    <Route path="/feed/:id">
                        <div className={styles.center}>
                            <FeedItem/>
                        </div>
                    </Route>
                    <ProtectedRoute path="/profile/orders" exact={true}>
                        <OrdersPage/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/orders/:id" exact={true}>
                        <div className={styles.center}>
                            <FeedItem/>
                        </div>
                    </ProtectedRoute>

                    <ProtectedRoute path="/profile" exact={true}>
                        <ProfilePage/>
                    </ProtectedRoute>
                    <Route path="/ingredients/:id" exact={true}>
                        <IngredientDetails/>
                    </Route>
                    <Route path="/" exact={true}>
                        <IndexPage/>
                    </Route>

                    <Route>
                        <NotFound404/>
                    </Route>
                </Switch>

                {background && (
                    <Route
                        path='/ingredients/:id'
                        children={
                            <Modal title={'Детали ингредиента'} onClose={handleModalClose}>
                                <IngredientDetails/>
                            </Modal>
                        }
                    />
                )}
                {background && (
                    <Route
                        path='/feed/:id'
                        children={
                            <Modal onClose={handleFeedModalClose}>
                                <FeedItem/>
                            </Modal>
                        }
                    />
                )}
                {background && (
                    <ProtectedRoute
                        path='/profile/orders/:id'
                        children={
                            <Modal onClose={handleFeedModalClose}>
                                <FeedItem/>
                            </Modal>
                        }
                    />
                )}
            </>
        );
    };

    return (
        <Router>
            <ModalSwitch/>
        </Router>
    );
}

export default App;
