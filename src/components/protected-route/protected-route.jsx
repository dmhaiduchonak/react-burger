import { Route, Redirect } from 'react-router-dom';
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children, ...rest }) => {
    const {email} = useSelector((state) => state.auth);

    return (
        <Route
            {...rest}
            render={() =>
                email ? (
                    children
                ) : (
                    <Redirect
                        to='/login'
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