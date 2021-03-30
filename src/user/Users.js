import React, { useState, useEffect } from 'react';
import { list } from './apiUser'
import defaultProfile from '../resources/avatar.jpg'
import { Link } from 'react-router-dom'

const Users = () => {
    let [users, setUsers] = useState([]);

    const renderUsers = users => (
        <div className="row">
            {users.map((user, i) => (

                <div key={i} className="card m-2 col-md-3">
                    <img className="card-img-top"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`}
                        onError={i=>(i.target.src=`${defaultProfile}`)}
                        alt={user.username}
                        style={{ width: "auto", height: "200px", objectFit: "contain" }} />
                    <div className="card-body">
                        <h5 className="card-title">{user.username}</h5>
                        <p className="card-text">{user.email}</p>
                        <Link to={`/user/${user._id}`} className="btn btn-raised btn-small btn-primary">
                            View Profile
                        </Link>
                    </div>

                </div>
            ))
            }
        </div>

    )
    useEffect(() => {
        list()
            .then(data => {
                if (data.error)
                    console.log(data.error)
                else
                    setUsers(users = data)
            })
    }, []);


    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Users</h2>
            {renderUsers(users)}
        </div>

    )
};

export default Users;