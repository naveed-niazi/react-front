import React, { useState, useEffect } from 'react';
import { isLoggedIn } from '../auth'
import { Redirect, Link } from 'react-router-dom'
import { read } from './apiUser'
import defaultProfile from '../resources/avatar.jpg'
import DeleteUser from './DeleteUser'
import FollowButton from './FollowButton'
import ProfileTabs from './ProfileTabs'
import { userPosts} from '../post/apiPost'

const Profile = (props) => {
    let [user, setUser] = useState({ following: [], followers: [] });
    let [redirectToSignin, setRedirectToSignin] = useState(false);
    let [error, setError] = useState("");
    let [posts, setPosts] = useState([]);

    let [following, setFollowing] = useState(false);
    //CHECKING   the following list
    let checkFollow = user => {
        const jwt = isLoggedIn()
        const match = user.followers.find(follower => {
            return follower._id === jwt.user._id
        })
        return match
    }
    let followClick = callApi => {
        const userId = isLoggedIn().user._id
        const token = isLoggedIn().token
        callApi(userId, token, user._id)
            .then(data => {
                if (data.error) {
                    setError(error = data.error)
                } else {
                    setUser(user = data)
                    setFollowing(!following)
                }
            })
    }
    let loadPosts = (userId) => {
        userPosts(userId, isLoggedIn().token)
            .then(data => {
                if (data.error) {
                    console.log(`🚀 ~ file: Profile.js ~ line 44 ~ loadPosts ~ data.error`, data.error)      
                } else {
                    setPosts(posts=data)
                }
            })
    }

    function init(userId) {
        read(userId, isLoggedIn().token)
            .then(data => {
                if (data.error) {
                    setRedirectToSignin(redirectToSignin = true)
                }
                else {
                    let follow = checkFollow(data)
                    setUser(user = data)
                    setFollowing(following = follow)
                    loadPosts(data._id)
                }
            })
    }
    useEffect(() => {
        const userId = props.match.params.userId;
        init(userId)
    }, [props.match.params.userId]);

    if (redirectToSignin) {
        return <Redirect to="/signin" />
    }
    let photoUrl = user._id ?
        `${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`
        : defaultProfile;
    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Profile</h2>

            <div className="row">
                <div className="col-md-4">
                    <img style={{ maxWidth: "100%", height: "15vw", objectFit: "contain" }}
                        src={photoUrl} alt={user.username}
                        onError={i => (i.target.src = `${defaultProfile}`)}
                        className="img-thumbnail" />
                  
                </div>
                <div className="col-md-8">
                    <div className="lead"><h3>{user.username}</h3>
                        <p>{user.email}</p>
                        <p>Joined: {new Date(user.created).toDateString()}</p>
                    </div>
                    {isLoggedIn().user && isLoggedIn().user._id === user._id ? (
                        <div className="d-inline-block mt-5">
                            <Link className="btn btn-info btn-raised mr-5"
                                to={`/post/create`}>
                                Create Post
                                </Link>
                            <Link className="btn btn-success btn-raised mr-5"
                                to={`/user/edit/${user._id}`}>
                                Edit Profile
                                </Link>
                            <DeleteUser userId={user._id} />
                        </div>
                    ) : <FollowButton following={following} onButtonClick={followClick} />}
                </div>

            </div>
            <div className="row mt-5 mb-3">
                <div className="col-md-12">
                    <p className="lead">{user.about}</p>
                    <hr />
                </div>
            </div>
            <ProfileTabs followers={user.followers} following={user.following} posts={posts} />
        </div>
    )
}

export default Profile;