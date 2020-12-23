import axios from 'axios';
import {Post, User} from "../shared/types";
import {environment} from "../environments/environment";

export const getPosts = () => {
    return axios.get<Post[]>(environment.baseApiRoot + '/posts', {withCredentials: true})
        .then((res) => res.data);
};


export const getPost = (id: number) => {
    return axios.get<Post>(environment.baseApiRoot + '/posts/' + id, {withCredentials: true})
        .then((res) => res.data);
};

export const getUser = (id: number) => {
    return axios.get<User>(environment.baseApiRoot + '/users/' + id, {withCredentials: true})
        .then((res) => res.data);
};

export const getPostsForUser = (id: number) => {
    return axios.get<Post[]>(environment.baseApiRoot + '/users/' + id + '/posts', {withCredentials: true})
        .then((res) => res.data);
};

export const login = (email: string, password: string) => {
    console.log('Logging in');
    let data = {
        email: email,
        password: password
    };
    return axios.post(environment.baseApiRoot + '/auth/login', data, {
        withCredentials: true
    })
        .then(res => res.data)
        .catch(e => {
            console.log('------');
            console.log(e);
            return new Promise(resolve => {
                resolve({status: 'fail', message: e.message})
            })
        });
};

export const register = (username: string,
                         first_name: string,
                         last_name: string,
                         email: string,
                         password: string,
                         status: string) => {
    console.log('Registering');
    let data = {
        username: username,
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        status: status
    };
    return axios.post(environment.baseApiRoot + '/auth/register', data, {
        withCredentials: true
    })
        .then((res) => {
            // console.log(res.data);
            console.log(res.data);
            return res.data;
        });
};

export const logout = () => {
    return axios.post(environment.baseApiRoot + '/auth/logout', {}, {
        withCredentials: true
    })
        .then((res) => {
            // console.log(res.data);
            console.log(res.data);
            return res.data;
        });
};

export const createPost = (title: string, text: string) => {
    console.log('Publishing post with title ' + title);
};


export const setTestCookies = () => {
    return axios.post(environment.baseApiRoot.replace('/api', '') + '/set-test-cookies', {}, {
        withCredentials: true
    })
        .then((res) => {
            // console.log(res.data);
            console.log(res.data);
            document.cookie = document.cookie + '; token=' + res.data['token'];
            return res.data;
        });
};

export const getTestCookies = () => {
    return axios.get(environment.baseApiRoot.replace('/api', '') + '/get-cookies', {withCredentials: true})
        .then((res) => res.data);
};
