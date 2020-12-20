import axios from 'axios';
import {Post, User} from "../shared/types";
import {environment} from "../environments/environment";

export const getPosts = () => {
    return axios.get<Post[]>(environment.baseApiRoot + '/posts')
        .then((res) => res.data);
};


export const getPost = (id: number) => {
    return axios.get<Post>(environment.baseApiRoot + '/posts/' + id)
        .then((res) => res.data);
};

export const getUser = (id: number) => {
    return axios.get<User>(environment.baseApiRoot + '/users/' + id)
        .then((res) => res.data);
};

export const getPostsForUser = (id: number) => {
    return axios.get<Post[]>(environment.baseApiRoot + '/users/' + id + '/posts')
        .then((res) => res.data);
};

export const login = (email: string, password: string) => {
    console.log('Logging in');
    return true;
};

export const register = (username: string,
                         first_name: string,
                         last_name: string,
                         email: string,
                         password: string,
                         status: string) => {
    console.log('Registering');
    return true;
};

export const createPost = (title: string, text: string) => {
    console.log('Publishing post with title ' + title);
};
