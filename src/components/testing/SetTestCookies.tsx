import React, {useEffect} from 'react';
import {setTestCookies} from "../../services/api";

export const SetTestCookies = () => {

    useEffect(() => {
        setTestCookies().then(() => console.log('Set test cookies'))
    }, []);

    return <h1>Setting test cookies</h1>;
};
