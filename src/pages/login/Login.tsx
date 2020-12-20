import React, {useState} from 'react';
import {login} from "../../services/api";
import {Input} from "../../components/input/Input";
import './Login.scss';

export interface UserInfo {
    email: string,
    password: string
}

export const Login = () => {

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    const onChangeHandler = (field: string, value: any) => {
        console.log(field, value);
        const newVal = {
            ...userInfo,
            [field]: value
        };

        setUserInfo(newVal as any);
    };

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (userInfo?.email && userInfo?.password) {
            let result = login(userInfo.email, userInfo.password);
        }
    };

    return <div className={'Login'}>
        <h1>Log in</h1>
        <div className={'login-form-wrapper'}>
            <form onSubmit={submitHandler}>
                <Input name="email"
                       type={'text'}
                       placeholder="Enter your email"
                       onChange={(value) => onChangeHandler('email', value)}
                       required/>
                <Input name="password"
                       type={'password'}
                       placeholder="Enter your password"
                       onChange={(value) => onChangeHandler('password', value)}
                       required/>
                <div className="">
                    <button type="submit" className="login-button">LOG IN</button>
                </div>
            </form>
        </div>
    </div>
}
