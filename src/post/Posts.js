import React, { useState, useEffect } from 'react';
import { list } from './apiPost'
import defaultPost from '../resources/kite.jpg'
import { Link } from 'react-router-dom'

const Posts = () => {
    let [posts, setPosts] = useState([]);

    const renderPosts = posts => {

        return (
            <div className="row">
                {posts.map((post, i) => {
                    const creatorId = post.postedBy ? `/user/${post.postedBy._id}` : ""
                    const creatorName = post.postedBy ? post.postedBy.username : " Unknown"
                    return (
                        < div key={i} className="card m-2 col-md-3 m-2" >
                            <img className="card-img-top"
                        src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}?${new Date().getTime()}`}
                        onError={i => (i.target.src = `${defaultPost}`)}
                        alt={post.title}
                        style={{ width: "auto", height: "200px", objectFit: "contain" }} />
                            < div className="card-body" >
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{`${post.body.substring(0,28)}...`}</p>
                                <br />
                                <p className="font-italic mark">
                                    Posted BY <Link to={`${creatorId}`}>{creatorName}</Link> on {new Date(post.created).toDateString()}
                                </p>
                                <Link to={`/post/${post._id}`} className="btn btn-raised btn-small btn-primary">
                                    View Post</Link>
                            </div>
                        </div >
                    )
                })}
            </div>
        )
    }
    useEffect(() => {
        list()
            .then(data => {
                if (data.error)
                    console.log(data.error)
                else {
                    setPosts(posts = data)
                    console.log(posts)
                }
            })
    }, []);


    return (
        <div className="container">
            <h2 className="mt-5 mb-5">New Posts</h2>
            {renderPosts(posts)}
        </div>

    )
};

export default Posts;