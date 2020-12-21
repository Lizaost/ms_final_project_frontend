import React, {useEffect} from 'react';
import {getTestCookies} from "../../services/api";

export const GetTestCookies = () => {

    useEffect(() => {
        getTestCookies().then(() => console.log('Got test cookies'))
    }, []);

    return <h1>Getting test cookies</h1>;
};
