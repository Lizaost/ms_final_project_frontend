import React, {useEffect, useState} from 'react';
import './PostDetails.scss';
import {useParams} from 'react-router';
import {Post, Comment} from "../../shared/types";
import {checkLoginStatus, createComment, getPost, getPostComments} from "../../services/api";
import {getFormattedDateAndTime} from "../../shared/dateformat";
import {Link} from "react-router-dom";
import {CommentsList} from "../../components/comments-list/CommentsList";
import {Input} from "../../components/input/Input";

export const PostDetails = () => {

    const {id} = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [comment, setComment] = useState('');
    const [updateComments, setUpdateComments] = useState(true);
    const [isCommentInputVisible, setCommentInputVisible] = useState(false);
    const [inputClearer, setInputClearer] = useState(null);

    useEffect(() => {
        checkLoginStatus().then(res => {
            setCommentInputVisible(res);
        })
    }, []);

    useEffect(() => {
        getPost(id)
            .then((post) => setPost(post));
    }, [id]);

    useEffect(() => {
        getPostComments(id)
            .then((comments) => {
                setComments(comments)
            });
    }, [id]);

    useEffect(() => {
        getPostComments(id)
            .then((comments) => setComments(comments));
    }, [updateComments]);

    const sendComment = () => {
        if (comment.length > 0) {
            createComment(id, comment).then((res) => {
                if (res.status === 'success') {
                    setUpdateComments(!updateComments);
                    setComment('');
                }
            })
        }
    };

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

                    <div className={'post-comments'}>
                        {isCommentInputVisible ?
                            <div className={'comment-input-wrapper'}>
                                <input name={'comment'}
                                       type={'text'}
                                       placeholder={'Comment...'}
                                       className={'comment-input form-control'}
                                       value={comment}
                                       onChange={(event) => setComment(event.target.value)}
                                />
                                < button className={'comment-send-button'} onClick={sendComment}>SEND</button>
                            </div>
                            : null}
                        <CommentsList comments={comments}/>
                    </div>
                </div>
                : null
            }
        </div>
    )
};
