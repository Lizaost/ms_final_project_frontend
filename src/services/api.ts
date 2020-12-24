import axios from 'axios';
import {Post, User, Comment} from "../shared/types";
import {environment} from "../environments/environment";


export const getPosts = () => {
    return axios.get<Post[]>(environment.baseApiRoot + '/posts', {withCredentials: true})
        .then((res) => res.data);
};

export const getPost = (id: number) => {
    return axios.get<Post>(environment.baseApiRoot + '/posts/' + id, {withCredentials: true})
        .then((res) => res.data);
};

export const getPostComments = (id: number) => {
    return axios.get<Comment[]>(environment.baseApiRoot + '/posts/' + id + '/comments',
        {withCredentials: true})
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
    let data = {
        email: email,
        password: password
    };
    return axios.post(environment.baseApiRoot + '/auth/login', data, {
        withCredentials: true
    })
        .then(res => {
            console.log(res.data);
            let accessToken = res.data.auth_token;
            // save access token in local storage
            window.localStorage.setItem('accessToken', accessToken);
            return res.data;
        })
        .catch(e => {
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
            let accessToken = res.data.auth_token;
            // save access token in local storage
            window.localStorage.setItem('accessToken', accessToken);
            window.localStorage.setItem('expireAt', String((new Date().getTime()/1000) + 60*30));
            return res.data;
        });
};

export const logout = () => {
    const data = {
        accessToken: window.localStorage.getItem('accessToken')
    };
    return axios.post(environment.baseApiRoot + '/auth/logout', data, {
        withCredentials: true
    })
        .then((res) => {
            // remove saved access token from local storage
            window.localStorage.removeItem('accessToken');
            window.localStorage.removeItem('expireAt');
            return res.data;
        });
};

export const checkLoginStatus = async () => {
    const data = {
        accessToken: window.localStorage.getItem('accessToken')
    };
    const expireAt = window.localStorage.getItem('expireAt');
    if (expireAt) {
        const now = new Date().getTime() / 1000;
        // if access token is about to expire
        if (+expireAt - now < 5) {
            // refresh access token
            await refreshAccessToken().then((res) => {
                if (res.status === 'success') {
                    // save new access token and its expiration time to local storage
                    window.localStorage.setItem('accessToken', res.accessToken);
                    window.localStorage.setItem('expireAt', String((new Date().getTime()/1000) + 60*30));
                    data.accessToken = res.accessToken;
                } else {
                    // if token cannot be refreshed, logout and redirect user to index page
                    logout().then(() => {
                        window.location.href = '/';
                    })
                }
            })
        }
    }
    return axios.post(environment.baseApiRoot + '/auth/check', data, {
        withCredentials: true
    })
        .then(res => {
            return res.data.isUserLoggedIn;
        })
        .catch(e => {
            return false;
        });
};

export const getProfile = () => {
    const data = {
        accessToken: window.localStorage.getItem('accessToken')
    };
    return axios.post(environment.baseApiRoot + '/auth/profile', data, {
        withCredentials: true
    })
        .then(res => res.data)
        .catch(e => {
            return new Promise(resolve => {
                resolve({status: 'fail', message: e.message})
            })
        });
};

export const refreshAccessToken = () => {
    // let refreshToken = window.localStorage.getItem('refreshToken');
    return axios.post(environment.baseApiRoot + '/auth/refresh', {}, {
        withCredentials: true
    })
        .then(res => res.data)
        .catch(e => {
            return new Promise(resolve => {
                resolve({status: 'fail', message: e.message})
            })
        });
};

export const createPost = (title: string, text: string) => {
    const data = {
        title: title,
        text: text,
        accessToken: window.localStorage.getItem('accessToken')
    };
    return axios.post(environment.baseApiRoot + '/posts', data, {
        withCredentials: true
    })
        .then(res => res.data)
        .catch(e => {
            return new Promise(resolve => {
                resolve({status: 'fail', message: e.message})
            })
        });
};


export const createComment = (post_id: number, text: string) => {
    const data = {
        post_id: post_id,
        text: text,
        accessToken: window.localStorage.getItem('accessToken')
    };
    console.log(data);
    return axios.post(environment.baseApiRoot + '/comments', data, {
        withCredentials: true
    })
        .then(res => res.data)
        .catch(e => {
            return new Promise(resolve => {
                resolve({status: 'fail', message: e.message})
            })
        });
};
