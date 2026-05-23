export async function createPost(post) {
    const response = await fetch('http://localhost:8080/api/v1/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(post)  // authorId, body
    })
    return await response.json()  // id, authorId, body, addedAt, updatedAt
}

export async function getAllPosts(page, size) {
    const response = await fetch(`http://localhost:8080/api/v1/posts?page=${page}&size=${size}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    return await response.json()
}

export async function likePost(postId, userId) {
    const response = await fetch(`http://localhost:8080/api/v1/posts/${postId}/likes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
            userId
        })
    })
    return await response.json()
}

export async function unlikePost(postId, likeId) {
    await fetch(`http://localhost:8080/api/v1/posts/${postId}/likes/${likeId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
    })
}

export async function getPostLikes(postId) {
    const response = await fetch(`http://localhost:8080/api/v1/posts/${postId}/likes`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    return await response.json()
}

export async function commentPost(postId, authorId, body) {
    const response = await fetch(`http://localhost:8080/api/v1/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
            authorId,
            body
        })
    })
    return await response.json()  // id, authorId, postId, parentId, body, addedAt, updatedAt
}

export async function getToken(username, password) {
    const response = await fetch(`http://localhost:8080/api/v1/tokens`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            identifier: username,
            password
        })
    })
    return await response.json()
}
