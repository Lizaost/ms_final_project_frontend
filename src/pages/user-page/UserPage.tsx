import React, {useEffect, useState} from 'react';
import './UserPage.css';
import {
    useParams
} from 'react-router';
import {User} from "../../shared/types";

export const UserPage = () => {

    const {id} = useParams();
    const [user, setUser] = useState<User | null>(null);

    return (
        <h1>
            {
                id ? ('A page for a user with id ' + id)
                    : null
            }
        </h1>
    )
};
