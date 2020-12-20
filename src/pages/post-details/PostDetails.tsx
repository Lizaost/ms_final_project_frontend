import React, {useEffect, useState} from 'react';
import './PostDetails.scss';
import {useParams} from 'react-router';
import {Post} from "../../shared/types";
import {getPost} from "../../services/api";
import {getFormattedDateAndTime} from "../../shared/dateformat";
import {Link} from "react-router-dom";

export const PostDetails = () => {

    const {id} = useParams();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        getPost(id).then((post) => setPost(post));
    }, [id]);

    return (
        <div>
            {post ?
                <div className={'PostDetails'}>
                    <div className={'post-meta'}>
                        <span className={'post-date'}>{getFormattedDateAndTime(post.published_at)}</span>
                        <span className={'post-author'}>
                            <Link to={`/user/${post.author.id}`}>
                                {post.author.first_name} {post.author.last_name}
                                <span className={'username'}>@{post.author.username}</span>
                            </Link>
                        </span>
                    </div>
                    <h2 className={'post-title'}>{post.title}</h2>
                    <p className={'post-text'}>{post.text}</p>
                </div>
                : null
            }
        </div>
    )
};
