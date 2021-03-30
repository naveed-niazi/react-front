import React, { useState, useEffect } from 'react';
import { findPeople, follow } from './apiUser'
import defaultProfile from '../resources/avatar.jpg'
import { Link } from 'react-router-dom'
import { isLoggedIn } from '../auth'


const FindPeople = () => {
    let [users, setUsers] = useState([]);
    let [error, setError] = useState("");
    let [open, setOpen] = useState(false);
    let [message, setMessage] = useState("");



    let clickFollow = (user, i) => {
        follow(isLoggedIn().user._id, isLoggedIn().token, user._id)
            .then(data => {
                if (data.error) {
                    setError(error = data.error)
                } else {
                    let toFollow = users
                    toFollow.splice(i, 1)
                    setUsers(users = toFollow)
                    setOpen(open = true)
                    setMessage(message = `Following ${user.username}`)
                }
            })
    }

    const renderUsers = users => (
        <div className="row">
            {users.map((user, i) => (

                <div key={i} className="card m-2 col-md-3">
                    <img className="card-img-top"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`}
                        onError={i => (i.target.src = `${defaultProfile}`)}
                        alt={user.username}
                        style={{ width: "auto", height: "200px", objectFit: "contain" }} />
                    <div className="card-body">
                        <h5 className="card-title text-align-center ">{user.username}</h5>
                        <Link to={`/user/${user._id}`} className="btn btn-raised btn-sm btn-primary">
                            View Profile
                        </Link>
                        <button onClick={() => clickFollow(user, i)} className="btn btn-raised btn-info float-right bnt-sm">Follow</button>
                    </div>

                </div>
            ))
            }
        </div>

    )
    useEffect(() => {
        findPeople(isLoggedIn().user._id, isLoggedIn().token)
            .then(data => {
                if (data.error)
                    console.log(data.error)
                else
                    setUsers(users = data)
            })
    }, []);


    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Find Friends</h2>
            {open &&
                <div className="alert alert-success">
                    <p> <p>{message}</p></p>
                </div>
            }
            {renderUsers(users)}
        </div>

    )
};

export default FindPeople;