import React from 'react';
import { isLoggedIn } from '../auth'
import {remove} from './apiUser'
import {signout} from '../auth'
import { useState } from 'react';
import { Redirect } from 'react-router';

const DeleteUser = ({userId}) => {

    let [redirect, setRedirect]=useState(false)

    function deleteAccount() {
        remove(userId, isLoggedIn().token)
            .then(data => {
                if (data.error) console.log(data.error);
                else {
                    signout(() => {console.log("user is deleted")})
                    setRedirect(redirect=true)
                }
        })
    }
    function deleteConfirmed() {
        let answer = window.confirm("Are you sure you want to delete the account!")
        if(answer) deleteAccount()
    }
    if (redirect === true) {
        return <Redirect to="/" />
    }
    return (
        <button onClick={deleteConfirmed} className="btn btn-danger btn-raised ">
            Delete Profile</button>
    );
};

export default DeleteUser;