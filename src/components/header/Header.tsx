import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

export const Header = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const currentUserId = 1;

    const logout = () => {
        console.log('Logging out');
        setLoggedIn(false);
    };

    const login = () => {
        console.log('Logging in');
        setLoggedIn(true);
    };

    const register = () => {
        console.log('Registering');
        setLoggedIn(true);
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
                    {/*{isLoggedIn ?*/}
                    {/*    <li className={"menu-item"}><Link to={`/user/${currentUserId}`}>My page</Link></li>*/}
                    {/*    : null*/}
                    {/*}*/}
                    <li className="menu-item"><Link to="/info">Project</Link></li>
                </ul>
                <div className="user-part">
                    {isLoggedIn ?
                        <div className={'user-part-wrapper'}>
                            <span className={'username'}>LOST</span>
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
