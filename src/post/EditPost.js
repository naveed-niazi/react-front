import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { isLoggedIn } from '../auth';
import { getPost, updatePost} from './apiPost'
import defaultPost from '../resources/kite.jpg'
import { Redirect } from 'react-router-dom';


const EditPost = (props) => {

    const { register, handleSubmit } = useForm();
    let [error, setError] = useState("");
    let [post, setPost] = useState({});
    let [redirectToPost, setRedirectToPost] = useState(false)

    const onSubmit = (data) => {
        const valid = isValid(data)
        if (valid) {
            const token = isLoggedIn().token
            const postId = props.match.params.postId

            let formData = new FormData()
            if (data.photo[0]){ formData.set('photo', data.photo[0])}
            formData.set('title', data.title)
            formData.set('body', data.body)

            updatePost(postId, token, formData)
                .then(data => {
                    if (data.error) {
                    console.log(`🚀 ~ file: EditPost.js ~ line 30 ~ onSubmit ~ data.error`, data.error)
                    setError(error="Unable to update post")
                    }
                    else {
                        setRedirectToPost(redirectToPost=true)
                    }
            })
        }
    }

    let isValid = (data) => {
        if (data.title.length < 5) {
            setError(error = "Use an appropriate Title ")
            return false
        }
        if (data.body.length < 20) {
            setError(error = "Use a comprehensive Description ")
            return false
        }
        setError(error = "")
        return true
    }

    useEffect(() => {
        const postId = props.match.params.postId
        getPost(postId).then(data => {
            if (data.error) {
                console.log(`🚀 ~ file: Post.js ~ line 11 ~ getPost ~ data.error`, data.error)
            } else {
                setPost(post = data)
            }
        })
    }, [])

    if (redirectToPost) {
        return (<Redirect to={`/post/${props.match.params.postId}`} />)

    }
    return (
        <div className="container">
            <h2 className="mt-5">Edit Post</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <img className="mb-5"
                    src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}?${new Date().getTime()}`}
                    onError={i => (i.target.src = `${defaultPost}`)}
                    alt={post.title}
                    style={{ width: "auto", height: "200px", objectFit: "contain" }} />
                <div className="alert alert-danger" role="alert" style={{ display: error ? "" : "none" }}>
                    {error}
                    <button onClick={()=>{setError(error="")}} type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div className="form-group">
                    <label className="text-muted">Post Picture</label>
                    <input
                        ref={register}
                        name="photo"
                        type="file"
                        accept="image/*"
                        className="form-control"
                        defaultValue={post.photo}
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Post Title</label>
                    <input name="title"
                        ref={register}
                        type="text"
                        className="form-control"
                        defaultValue={post.title} />
                </div>
                <div className="form-group">
                    <label className="text-muted">Post Description</label>
                    <textarea name="body"
                        ref={register}
                        rows="8"
                        type="text"
                        className="form-control"
                        defaultValue={post.body} />
                </div>
                <button className="btn btn-raised btn-primary "> Update Post</button>
            </form>
        </div>
    );
};

export default EditPost;