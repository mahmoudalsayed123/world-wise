import React, { useContext, useEffect } from "react";
import { AuthCotext } from "../App";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoutes({children}) {

    const {isAuth} = useContext(AuthCotext);
    const navigate = useNavigate();

    useEffect(function () {
        if(!isAuth) navigate("/") 
    },[isAuth,navigate]);

    return isAuth ? children : null
}
