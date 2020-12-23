import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import {checkLoginStatus, getProfile} from "../../services/api";

export interface UserData {
    email: string,
    first_name: string,
    last_name: string,
    status: string,
    user_id: string,
    username: string,
}

export const Header = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        if (checkLoginStatus()) {
            setLoggedIn(true);
            getProfile().then((data) => {
                setUserData(data.data);
            })
        }
    }, []);

    const logout = () => {
        window.location.href = '/logout'
    };

    const login = () => {
        window.location.href = '/login'
    };

    const register = () => {
        window.location.href = '/register'
    };

    return (
        <div className={'Header'}>
            <div className="title-wrapper">
                <h1 className="title">
                    MS Final Project
                </h1>
            </div>
            <div className="right-part">
                <ul className="menu">
                    <li className="menu-item"><Link to="/">Start</Link></li>
                    <li className="menu-item"><Link to="/info">Project</Link></li>
                    {isLoggedIn ?
                        <li className={"menu-item"}><Link to={`/create`}>New post</Link></li>
                        : null
                    }
                </ul>
                <div className="user-part">
                    {isLoggedIn && userData?
                        <div className={'user-part-wrapper'}>
                            <span className={'username'}>
                                <Link to={`/user/${userData.user_id}`}>
                                    @{userData.username}
                                </Link>
                            </span>
                            <div>
                                <button onClick={logout}>LOG OUT</button>
                            </div>
                        </div>
                        : <div>
                            <button onClick={login}>LOG IN</button>
                            <button onClick={register}>REGISTER</button>
                        </div>}
                </div>
            </div>
        </div>
    )
}
