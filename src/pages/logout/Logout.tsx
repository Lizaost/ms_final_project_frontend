import React, {useEffect} from "react";
import {logout} from "../../services/api";

export const Logout = () => {

    useEffect(() => {
        console.log('Logging out');
        logout().then(() => {
            window.location.href= '/'
        })
    }, []);

    return <h1>Logging out</h1>

};
