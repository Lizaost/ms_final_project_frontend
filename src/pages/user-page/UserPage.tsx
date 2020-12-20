import React, {useEffect, useState} from 'react';
import './UserPage.scss';
import {
    useParams
} from 'react-router';
import {Post, User} from "../../shared/types";
import {getPosts, getPostsForUser, getUser} from "../../services/api";
import {PostsList} from "../../components/posts-list/PostsList";

export const UserPage = () => {

    const {id} = useParams();
    const [user, setUser] = useState<User | null>(null);

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        console.log('Loading user info for user with id ' + id);
        getUser(id).then((user) => setUser(user));
    }, [id]);

    useEffect(() => {
        console.log('Loading all posts for user with id ' + id);
        getPostsForUser(id).then((posts) => setPosts(posts));
    }, [id]);

    return (
        <div className={'UserPage'}>
            {user ?
                <div className={'user-info'}>
                    <h1 className={'user-name'}>{user.first_name} {user.last_name}</h1>
                    <h2 className={'user-username'}>@{user.username}</h2>
                    <p className={'user-status'}>{user.status}</p>
                </div>
                : null}
            {user && posts ?
                <PostsList posts={posts}/>
                : null}
        </div>
    )
};
