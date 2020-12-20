import React from 'react';
import './PostsList.css';
import {Post} from "../../shared/types";
import {PostCard} from "../post-card/PostCard";

type Props = {
    posts: Post[],
}

export const PostsList: React.FunctionComponent<Props> = ({posts}) => {

    return <div className={'PostsList'}>
        {
            posts.map((post) => {
                return <PostCard post={post}/>
            })
        }
    </div>;
};
