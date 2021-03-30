import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { isLoggedIn } from '../auth';
import { update, updateUser} from './apiUser';
import { Redirect } from 'react-router-dom';
import defaultProfile from '../resources/avatar.jpg'


const UpdateProfile = () => {

    const { register, handleSubmit } = useForm();
    let [redirectToProfile, setRedirectToProfile] = useState(false);
    let [Updating, setUpdating] = useState(false);
    let [error, setError] = useState("");


    const onSubmit = (data) => {
        let userId = isLoggedIn().user._id;
        let token = isLoggedIn().token;
        let formData = new FormData()
        formData.set('photo', data.photo[0])
        formData.set('username', data.username)
        formData.set('email', data.email)
        formData.set('password', data.password)
        formData.set('about', data.about)

        if (isValid(data)) {
            update(userId, token, formData)
                .then(data => {
                    if (data.error) {
                        setError(error = data.error)
                        console.log(data.error)
                    }
                    else {
                        updateUser(data, () => { setRedirectToProfile(redirectToProfile = true)})
                        
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
        if (data.username < 4) {
            setError(error = "Username must be at least 5 letter")
            setUpdating(Updating=false)
            return false
        }
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(data.email))) {
            setError(error = "Require a Valid Email")
            setUpdating(Updating = false)
            return false
        }
        setError(error = "")
        return true
    }

    if (redirectToProfile) {
        return (<Redirect to={`/user/${isLoggedIn().user._id}?${new Date().getTime()}`} />)

    }
    let photoUrl = isLoggedIn().user._id ?
        `${process.env.REACT_APP_API_URL}/user/photo/${isLoggedIn().user._id}?${new Date().getTime()}`
        : defaultProfile;
    return (
        <div className="container">

            <h2 className="mt-5 mb-5">Edit Profile</h2>
            {Updating ? <div className="jumbotron text-center" >Loading...</div> : ""}
            <img style={{ maxWidth: "100%", height: "15vw", objectFit: "contain" }}
                src={photoUrl} alt={isLoggedIn().user.username} className="img-thumbnail" />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="alert alert-danger"style={{ display: error ? "" : "none" }}>{error}
                    <button onClick={() => { setError(error = "") }} type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
                <div className="form-group">
                    <label className="text-muted">Profile Picture</label>
                    <input
                        ref={register}
                        name="photo"
                        type="file"
                        accept="image/*"
                        className="form-control" />
                </div>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input name="username"
                        ref={register}
                        type="text"
                        className="form-control"
                        defaultValue={isLoggedIn().user.username} />
                </div>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input name="email"
                        ref={register}
                        type="email"
                        className="form-control"
                        defaultValue={isLoggedIn().user.email} />
                </div>
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input name="password"
                        ref={register}
                        type="password"
                        className="form-control" />
                </div>
                <div className="form-group">
                    <label className="text-muted">About me</label>
                    <textarea name="about"
                        ref={register}
                        type="text"
                        className="form-control"
                        defaultValue={isLoggedIn().user.about} />
                </div>


                <button className="btn btn-raised btn-primary "> Update </button>
            </form>
        </div>
    );
};

export default UpdateProfile;