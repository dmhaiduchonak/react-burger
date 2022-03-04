import {Route, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {useEffect} from "react";
import {getProfile} from "../../services/actions/profile";
import {RouteProps} from "react-router";

const ProtectedRoute = ({ children, ...rest }: RouteProps) => {
    const dispatch = useDispatch();

    const {email, is_login_completed} = useSelector((state: any) => state.auth);

    useEffect(():void => {
        dispatch(getProfile())
    }, [dispatch]);

    if (!is_login_completed) {
        return null;
    }

    return (
        <Route
            {...rest}
            render={({ location }) =>
                email ? (
                    children
                ) : (
                    <Redirect
                        to={{ pathname: "/login", state: { from: location } }}
                    />
                )
            }
        />
    );
}

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired
};
export default ProtectedRoute;