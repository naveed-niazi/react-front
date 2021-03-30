export const create = (userId, token, post) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`, {
        method: 'POST',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body:post
    })
        .then(response => {
            return response.json()
        })
        .catch(error => console.log(error))
}
export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/posts`, {
        method: 'GET',
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
};
//post by id
export const getPost = (postId) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: 'GET',
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
};

//all post by single user

export const userPosts = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/post/by/${userId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
};

//deleting post
export const removePost = (postId, token) => {

    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: 'DELETE',
        headers: {
            Accept: "application/json",
            "content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(error => console.log(error))
}
export const updatePost = (postId, token, post) => {

    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
        .then(response => {
            return response.json()
        })
        .catch(error => console.log(error))
}
export const likePost = (userId, token, postId) => {

    return fetch(`${process.env.REACT_APP_API_URL}/post/like`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId})
    })
        .then(response => {
            return response.json()
        })
        .catch(error => console.log(error))
}
export const unlikePost = (userId, token, postId) => {

    return fetch(`${process.env.REACT_APP_API_URL}/post/unlike`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({userId, postId})
    })
        .then(response => {
            return response.json()
        })
        .catch(error => console.log(error))
}

export const comment = (userId, token, postId, comment) => {

    return fetch(`${process.env.REACT_APP_API_URL}/post/comment`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId , comment})
    })
        .then(response => {
            return response.json()
        })
        .catch(error => console.log(error))
}
export const uncomment = (userId, token, postId, comment) => {

    return fetch(`${process.env.REACT_APP_API_URL}/post/uncomment`, {
        method: 'PUT',
        headers: {
            Accept: "application/json",
            "content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ userId, postId, comment })
    })
        .then(response => {
            return response.json()
        })
        .catch(error => console.log(error))
}