import React from 'react';
import './CommentsList.scss';
import {Comment} from "../../shared/types";
import {CommentItem} from "../comment-item/CommentItem";

type Props = {
    comments: Comment[],
}

export const CommentsList: React.FunctionComponent<Props> = ({comments}) => {

    return <div className={'CommentsList'}>
        {
            comments.map((comment) => {
                return <CommentItem comment={comment}/>
            })
        }
    </div>;
};
