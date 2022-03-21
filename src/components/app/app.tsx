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
import {resetCurrentIngredient} from "../../services/actions/ingredients";
import {LocationState} from "../../types";
import {FeedPage} from "../../pages/feed";
import {OrdersPage} from "../../pages/orders";
import {useAppDispatch} from "../../utils/hooks";
import {FeedItemPage} from "../../pages/feed-item";
import {OrdersItemPage} from "../../pages/orders-item";


const App: React.FC = () => {
    const ModalSwitch = () => {
        const dispatch = useAppDispatch();
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
                            <FeedItemPage/>
                    </Route>
                    <ProtectedRoute path="/profile/orders" exact={true}>
                        <OrdersPage/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/orders/:id" exact={true}>
                            <OrdersItemPage/>
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
                                <FeedItemPage/>
                            </Modal>
                        }
                    />
                )}
                {background && (
                    <ProtectedRoute
                        path='/profile/orders/:id'
                        children={
                            <Modal onClose={handleFeedModalClose}>
                                <OrdersItemPage/>
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
