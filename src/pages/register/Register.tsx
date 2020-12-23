import React, {useState} from 'react';
import {login, register} from "../../services/api";
import {Input} from "../../components/input/Input";
import './Register.scss';

export interface UserInfo {
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    status: string;
}

export const Register = () => {

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [registerError, setRegisterError] = useState<String | null>(null);

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
        setRegisterError(null);
        if (userInfo?.username && userInfo?.first_name && userInfo?.last_name &&
            userInfo?.email && userInfo?.password && userInfo?.status) {
            try {
                register(userInfo.username, userInfo.first_name, userInfo.last_name, userInfo.email,
                    userInfo.password, userInfo.status)
                    .then((res) => {
                        console.log(res.status);
                        if (res.status === 'success') {
                            window.location.href = '/user/' + res.user_id;
                        } else {
                            setRegisterError('Something went wrong. Try again.')
                        }
                    });
            } catch (e) {
                setRegisterError('Something went wrong. Try again.')
            }
        }
    };

    return <div className={'Register'}>
        <h1>Register</h1>
        { registerError ?
            <div className={'register-error-wrapper'}>
                <span>{registerError}</span>
            </div>
            : null }
        <div className={'register-form-wrapper'}>
            <form onSubmit={submitHandler}>
                <Input name="username"
                       type={'text'}
                       label={'Username'}
                       placeholder="Enter your username"
                       onChange={(value) => onChangeHandler('username', value)}
                       required/>

                <Input name="first_name"
                       type={'text'}
                       label={'First name'}
                       placeholder="Enter your first name"
                       onChange={(value) => onChangeHandler('first_name', value)}
                       required/>

                <Input name="last_name"
                       type={'text'}
                       label={'Last name'}
                       placeholder="Enter your last name"
                       onChange={(value) => onChangeHandler('last_name', value)}
                       required/>

                <Input name="email"
                       type={'text'}
                       label={'E-mail'}
                       placeholder="Enter your email"
                       onChange={(value) => onChangeHandler('email', value)}
                       required/>

                <Input name="password"
                       type={'password'}
                       label={'Password'}
                       placeholder="Enter your password"
                       onChange={(value) => onChangeHandler('password', value)}
                       required/>

                <Input name="status"
                       type={'text'}
                       label={'Status'}
                       placeholder="Enter your status"
                       areSpacesAllowed={true}
                       onChange={(value) => onChangeHandler('status', value)}
                       required/>

                <div className="">
                    <button type="submit" className="register-button">REGISTER</button>
                </div>
            </form>
        </div>
    </div>
}
