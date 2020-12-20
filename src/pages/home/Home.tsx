import React, {useEffect, useState} from 'react';
import './Home.css';
import {Post} from "../../shared/types";
import {PostsList} from "../../components/posts-list/PostsList";
import {getPosts} from "../../services/api";

export const Home = () => {

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        console.log('Loading all posts');
        getPosts().then((posts) => setPosts(posts));
    }, []);

    return (
        <div>
            <PostsList posts={posts}/>
        </div>
    )
};
