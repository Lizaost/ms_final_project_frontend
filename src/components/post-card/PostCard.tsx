import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './PostCard.css';
import {Post} from "../../shared/types";
import {getFormattedDayAndMonth} from "../../shared/dateformat";

type Props = {
    post: Post,
}

export const PostCard: React.FunctionComponent<Props> = ({post}) => {

    const annotation = post.text.substr(0, 1000);

    return <div className={'PostCard'}>
        <Link to={`/posts/${post.id}`}>
            <div className={'post-meta'}>
                <span className={'post-author'}>
                    <Link to={`/user/${post.author.id}`}>
                        @{post.author.username}
                    </Link>
                </span>
                {' at '}
                <span className={'post-date'}>{getFormattedDayAndMonth(post.published_at)}</span>
            </div>
            <h2 className={'post-title'}>{post.title}</h2>
            <p className={'post-text'}>{post.text.length < 1000 ? post.text : annotation + '...'}</p>
        </Link>
    </div>
};
