import React, {useEffect} from "react";
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {sendLogout} from "../services/actions/logout";

export const LogoutPage = () => {
    const dispatch = useDispatch();
    const {email} = useSelector((state) => state.auth);

    useEffect(() => {
        if (email) dispatch(sendLogout());
    })

    return <Redirect to="/login" />;
}