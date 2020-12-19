import React, {useEffect, useState} from 'react';
import './PostDetails.css';
import {
    useParams
} from 'react-router';
import {Post} from "../../shared/types";

export const PostDetails = () => {

    const {id} = useParams();
    const [post, setPost] = useState<Post | null>(null);

    return (
        <h1>
            {
                id ? ('A page for a post with id ' + id)
                    : null
            }
        </h1>
    )
};
