import React, {useEffect, useState} from 'react';
import './Home.scss';
import {Post} from "../../shared/types";
import {PostsList} from "../../components/posts-list/PostsList";
import {getPosts} from "../../services/api";
import {Link} from "react-router-dom";

export const Home = () => {

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        console.log('Loading all posts');
        getPosts().then((posts) => setPosts(posts));
    }, []);

    return (
        <div className={'Home'}>
            <div className={'header'}>
                <h1 className={'title'}>Welcome</h1>
                <p className={'welcome-text'}>It is a simple blogging platform made as a final project for Securing
                    Mobile Applications course by Ostapenko Yelizaveta.<br/><br/>
                        <Link to={'/info'} className={'learn-more-link'}>Learn more about realized security features</Link></p>
            </div>
            {posts ?
                <PostsList posts={posts}/>
                : null}
        </div>
    )
};
