import {Route, Redirect} from 'react-router-dom';
import {useEffect} from "react";
import {getProfile} from "../../services/actions/profile";
import {RouteProps} from "react-router";
import {useAppDispatch, useAppSelector} from "../../utils/hooks";

const ProtectedRoute = ({ children, ...rest }: RouteProps) => {
    const dispatch = useAppDispatch();

    const {email, is_login_completed} = useAppSelector(state => state.auth);

    useEffect(() => {
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

export default ProtectedRoute;