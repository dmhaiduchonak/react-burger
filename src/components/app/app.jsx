import React, {useEffect} from 'react';
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
import {getProfile} from "../../services/actions/profile";

const App = () => {

    const ModalSwitch = () => {
        const dispatch = useDispatch();
        const location = useLocation();
        const history = useHistory();
        let background = location.state && location.state.background;

        const handleModalClose = () => {
            dispatch(resetCurrentIngredient);
            history.goBack();
        };
        useEffect(() => {
            dispatch(getProfile());
        }, [dispatch]);

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
                    <ProtectedRoute path="/profile" exact={true}>
                        <ProfilePage/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/orders" exact={true}>
                        <ProfilePage/>
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/orders/:id">
                        <ProfilePage/>
                    </ProtectedRoute>
                    <Route path="/ingredients/:id" exact>
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
                            <Modal onClose={handleModalClose}>
                                <IngredientDetails/>
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
