import React from 'react';
import { Link } from 'react-router-dom'
import defaultProfile from '../resources/avatar.jpg'
import defaultPost from '../resources/kite.jpg'


const ProfileTabs = ({ followers, following, posts }) => {
    return (
        <div className='row'>
            <div className='col-md-4'>
                <h3 className="text-primary">Followers</h3>
                <hr />
                {followers.map((person, i) => (
                    <div key={i} className="mt-1 ml-2">
                        <div className="row row-content align-items-center">
                            <div className="col col-sm order-sm-first col-md">
                                <Link to={`/user/${person._id}`}>
                                    <div className="media">
                                        <img src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                                            style={{ borderRadius: "50%", border: "1px solid black" }}
                                            alt={person.username}
                                            className="mr-2 float-left"
                                            height='35px'
                                            width='35px'
                                            onError={i => (i.target.src = `${defaultProfile}`)} />
                                        <div className="media-body" >
                                            <p className="lead">{person.username}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='col-md-4'>
                <h3 className="text-primary">Following</h3>
                <hr />
                {following.map((person, i) => (
                    <div key={i} className="mt-1 ml-2">
                        <div className="row row-content align-items-center">
                            <div className="col col-sm order-sm-first col-md">
                                <Link to={`/user/${person._id}`}>
                                    <div className="media">
                                        <img src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
                                            style={{ borderRadius: "50%", border: "1px solid black" }}
                                            alt={person.username}
                                            className="mr-2 float-left"
                                            height='35px'
                                            width='35px'
                                            onError={i => (i.target.src = `${defaultProfile}`)} />
                                        <div>
                                            <p className="lead">{person.username}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='col-md-4'>
                <h3 className="text-primary">Following</h3>
                <hr />
                {posts.map((post, i) => {
                    const creatorId = post.postedBy ? `/user/${post.postedBy._id}` : ""
                    const creatorName = post.postedBy ? post.postedBy.username : " Unknown"
                    return (
                        < div key={i} className="card m-2" >
 
                            < div className="card-body" >
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{`${post.body.substring(0, 28)}...`}</p>
                                <br />
                                <p className="font-italic mark">
                                    Created on {new Date(post.created).toDateString()}
                                </p>
                                <Link to={`/post/${post._id}`} className="btn btn-raised btn-small btn-primary">
                                    View Post</Link>
                            </div>
                        </div >
                    )
                })}
            </div>
        </div>

    );
};

export default ProfileTabs;