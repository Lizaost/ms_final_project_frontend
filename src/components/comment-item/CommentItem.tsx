import React from 'react';
import {Comment} from "../../shared/types";
import {getFormattedDateAndTime} from "../../shared/dateformat";
import {Link} from "react-router-dom";
import './CommentItem.scss';

type Props = {
    comment: Comment,
}

export const CommentItem: React.FunctionComponent<Props> = ({comment}) => {

    return <div className={'Comment'}>
        <div className="comment-meta">
            <span className={'comment-author'}>
                    <Link to={`/user/${comment.author.id}`}>
                        {comment.author.first_name} {comment.author.last_name}
                        <span className={'username'}>
                        @{comment.author.username}
                        </span>
                    </Link>
                </span>
            <span> at </span>
            <span className="published-at">{getFormattedDateAndTime(comment.published_at)}</span>
        </div>
        <p>{comment.text}</p>
    </div>
}
