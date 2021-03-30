import React, { useEffect, useState } from 'react';
import defaultPost from '../resources/kite.jpg'
import { Link, Redirect } from 'react-router-dom'
import { getPost, removePost, likePost, unlikePost } from './apiPost'
import { isLoggedIn } from '../auth'
import Comments from './Comments'


const Post = (props) => {
    let [post, setPost] = useState({});
    let [liked, setLiked] = useState(false);
    let [likes, setLikes] = useState(0);
    let [loading, setLoading] = useState(true);
    let [deleted, setDeleted] = useState(false);

    let checkLiked = (likes) => {
        if (isLoggedIn().user) {
            const userId = isLoggedIn().user._id
            const match = likes.indexOf(userId) !== -1
            return match
        }
        return false 
    }
    useEffect(() => {
        const postId = props.match.params.postId
        getPost(postId).then(data => {
            if (data.error) {
                console.log(`🚀 ~ file: Post.js ~ line 11 ~ getPost ~ data.error`, data.error)
            } else {
                setPost(post = data)
                setLikes(likes = data.likes.length)
                setLoading(loading = false)
                setLiked(liked = checkLiked(data.likes))
            }
        }
        )
    }, [])


    function deleteConfirmed() {
        let answer = window.confirm("Are you sure you want to delete the account!")
        if (answer) deletePost()
    }
    let deletePost = () => {
        const postId = props.match.params.postId
        removePost(postId, isLoggedIn().token)
            .then(data => {
                if (data.error) {
                    console.log(`🚀 ~ file: Post.js ~ line 28 ~ deletePost ~ data.error`, data.error)
                } else {
                    setDeleted(deleted = true)
                }
            })
    }
    let likeClick = () => {
        const userId = isLoggedIn().user._id
        const token = isLoggedIn().token
        if (!liked) {
            likePost(userId, token, post._id)
                .then(data => {
                    if (data.error)
                        console.log(data.error)
                    else {
                        setLiked(liked = true)
                        setLikes(likes = likes + 1)
                    }
                })
        } else {
            unlikePost(userId, token, post._id)
                .then(data => {
                    if (data.error)
                        console.log(data.error)
                    else {
                        setLiked(liked = false)
                        setLikes(likes = likes - 1)
                    }
                })
        }
    }
    let renderPost = post => {

        const creatorId = post.postedBy ? `/user/${post.postedBy._id}` : ""
        const creatorName = post.postedBy ? post.postedBy.username : " Unknown"
        if (deleted) {
            return <Redirect to="/" />
        }

        return (
            <>
                { loading ? <div className="jumbotron text-center">Loading...</div> :
                    <>
                        <p className="font-italic mark">
                            Posted By <Link to={`${creatorId}`}>{creatorName}</Link> on {new Date(post.created).toDateString()}{". "}
                             Likes: <strong>{likes}</strong>
                        </p>
                        <div className="card" >
                            <img className="card-img-top"
                                src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}?${new Date().getTime()}`}
                                onError={i => (i.target.src = `${defaultPost}`)}
                                alt={post.title}
                                style={{ objectFit: "contain" }} />
                            < div className="card-body" >
                                <p className="card-text">{`${post.body}`}</p>
                                <br />
                                <div className="d-inline-block">
                                    <Link to={`/`} className="btn btn-raised btn-primary mr-3">
                                        View Other Post
                                    </Link>
                                    {isLoggedIn().user && isLoggedIn().user._id === post.postedBy._id
                                        ?
                                        (
                                            <>
                                                <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-warning mr-3">
                                                    Edit Post
                                                </Link>
                                                <button onClick={deleteConfirmed} className="btn btn-raised btn-danger mr-3">
                                                    Delete Post
                                                </button>

                                            </>
                                        )
                                        :
                                        ""}
                                    {isLoggedIn().user
                                        ?
                                        <>
                                            {!liked
                                                ?
                                                <button onClick={likeClick} class="btn btn-raised btn-primary">
                                                    Like
                                                </button>
                                                :
                                                <button onClick={likeClick} class="btn btn-raised btn-danger">
                                                    Unlike
                                                </button>
                                            }

                                        </>
                                        :
                                        ""}
                                </div>

                            </div>
                        </div >
                    </>
                }
            </>
        )
    }
    return (
        <div className="container">
            <div className="d-flex justify-content-center flex-column">
                <h2 className="mt-5">{post.title}</h2>
                {renderPost(post)}
                <Comments postId={post._id} comments={post.comments}/>
            </div>
        </div>
    );
};

export default Post;