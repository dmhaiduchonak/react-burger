import React, {useEffect} from "react";
import {Redirect} from "react-router-dom";
import {sendLogout} from "../services/actions/logout";
import {useAppDispatch, useAppSelector} from "../utils/hooks";

export const LogoutPage = () => {
    const dispatch = useAppDispatch();
    const {email} = useAppSelector(state => state.auth);

    useEffect(() => {
        if (email) dispatch(sendLogout());
    })

    return <Redirect to="/login"/>;
}