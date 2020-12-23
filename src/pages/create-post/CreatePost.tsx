import React, {useState} from 'react';
import {Input} from "../../components/input/Input";
import {createPost} from "../../services/api";
import './CreatePost.scss'

export const CreatePost = () => {

    const [postTitle, setPostTitle] = useState('');
    const [postText, setPostText] = useState('');

    const publishPost = () => {
        if (postText.length > 0 && postTitle.length > 0) {
            createPost(postTitle, postText).then((res) => {
                console.log(res);
                if (res.status === 'success') {
                    window.location.href = '/user/' + res.user_id;
                }
            });
        }
    };

    return <div className={'CreatePost'}>
        <h1>Create a new post</h1>
        <div className={'form-wrapper'}>
            <Input name={'post-title'}
                   type={'text'}
                   placeholder={'Enter post title'}
                   className={'labeled'}
                   areSpacesAllowed={true}
                   onChange={setPostTitle}/>
            <textarea className={'post-text'}
                      onChange={(event) => {
                          setPostText(event.target.value)
                      }}
                      placeholder={'Enter post text'}/>
            <button onClick={publishPost} className={'post-button'}>CREATE A POST</button>
        </div>
    </div>
}
