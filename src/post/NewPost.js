import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { isLoggedIn } from '../auth';
import { Redirect } from 'react-router-dom';
import { create } from './apiPost'


const NewPost = () => {

    const { register, handleSubmit } = useForm();
    let [redirectToProfile, setRedirectToProfile] = useState(false);
    let [Updating, setUpdating] = useState(false);
    let [error, setError] = useState("");


    const onSubmit = (data) => {
        let userId = isLoggedIn().user._id;
        let token = isLoggedIn().token;

        //dealing with form data here
        let formData = new FormData()
        formData.set('photo', data.photo[0])
        formData.set('title', data.title)
        formData.set('body', data.body)
        formData.set('postedBy', isLoggedIn().user._id)

        if (isValid(data)) {
            create(userId, token, formData)
                .then(data => {
                    if (data.error) {
                        setError(error = data.error)
                        console.log(data.error)
                    } else {
                        console.log('new post: ', data)
                        setRedirectToProfile(redirectToProfile = true)
                    }
                })
        }
    };
    let isValid = data => {
        if (data.photo[0] && data.photo[0].size > 10000000) {
            setError(error = "Photo size is too big")
            setUpdating(Updating = false)
            return false
        }
        if (data.title.length < 4) {
            setError(error = "Add a Proper Title")
            setUpdating(Updating = false)
            return false
        }
        if (data.body.length < 10) {
            setError(error = "Add a Proper Post Description")
            setUpdating(Updating = false)
            return false
        }
        setError(error = "")
        return true
    }

    if (redirectToProfile) {
        return (<Redirect to={`/user/${isLoggedIn().user._id}`} />)
    }
    return (
        <div className="container">

            <h2 className="mt-5 mb-5">Create new Post</h2>
            {Updating ? <div className="jumbotron text-center" >Loading...</div> : ""}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}>{error}</div>
                <div className="form-group">
                    <label className="text-muted">Post Photo</label>
                    <input
                        ref={register}
                        name="photo"
                        type="file"
                        accept="image/*"
                        className="form-control" />
                </div>
                <div className="form-group">
                    <label className="text-muted">Post Title</label>
                    <input name="title"
                        ref={register}
                        type="text"
                        className="form-control" />
                </div>
                <div className="form-group">
                    <label className="text-muted">Post Body</label>
                    <input name="body"
                        ref={register}
                        type="text"
                        className="form-control" />
                </div>
                <button className="btn btn-raised btn-primary ">Create Post</button>
            </form>
        </div>
    );
};

export default NewPost;