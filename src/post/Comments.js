import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import {comment, uncomment} from './apiPost'
import { isLoggedIn } from '../auth';
import {Link} from 'react-router-dom'

const Comments = (props) => {
    const { register, handleSubmit } = useForm();
    let [comments , setComments]=useState(props.comments)

    let handleReset = () => {
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
    };

    const onSubmit = (data) => {
        const userId = isLoggedIn().user._id
        const token = isLoggedIn().token
        const postId = props.postId


        comment(userId, token, postId, data.comment)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    handleReset()
                    //dispatch fresh list of comments to post
                    setComments(comments.push)
                }
        })




        console.log(`🚀 ~ file: Comment.js ~ line 8 ~ onSubmit ~ data`, data)
    }
    return (
        <div>
            <h2 className="mt-5 mb-5">Leave a comment</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <input className="form-control " type="text"
                        ref={register}
                        name="comment" />
                </div>
            </form>

            <h2 className="mt-5 mb-5">Comments</h2>
            {props.comments > 1
                ?
                props.comments.map((comment, i) => {
                <h1>{comment.text}</h1>
                })
                :
                ""
            }
        </div>
    );
};

export default Comments;