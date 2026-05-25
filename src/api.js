const BASE = 'http://localhost:8080/api/v1'

function authHeaders() {
    const token = localStorage.getItem('accessToken')
    return token ? { 'Authorization': `Bearer ${token}` } : {}
}

export async function createPost(post) {
    const response = await fetch(`${BASE}/posts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders()
        },
        body: JSON.stringify(post)
    })
    return await response.json()
}

export async function getAllPosts(page, size) {
    const response = await fetch(`${BASE}/posts?page=${page}&size=${size}`, {
        method: 'GET',
        headers: authHeaders()
    })
    return await response.json()
}

export async function likePost(postId, userId) {
    const response = await fetch(`${BASE}/posts/${postId}/likes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders()
        },
        body: JSON.stringify({ userId })
    })
    return await response.json()
}

export async function unlikePost(postId, likeId) {
    await fetch(`${BASE}/posts/${postId}/likes/${likeId}`, {
        method: 'DELETE',
        headers: authHeaders()
    })
}

export async function getPostLikes(postId) {
    const response = await fetch(`${BASE}/posts/${postId}/likes`, {
        method: 'GET',
        headers: authHeaders()
    })
    return await response.json()
}

export async function commentPost(postId, authorId, body) {
    const response = await fetch(`${BASE}/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders()
        },
        body: JSON.stringify({ authorId, body })
    })
    return await response.json()
}

export async function getToken(username, password) {
    const response = await fetch(`${BASE}/tokens`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: username, password })
    })
    return await response.json()
}

export async function registerUser(username, email, phone, password) {
    const response = await fetch(`${BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, phone, password })
    })
    return await response.json()
}

export async function getCurrentUser() {
    const response = await fetch(`${BASE}/tokens/me`, {
        method: 'GET',
        headers: authHeaders()
    })
    return await response.json()
}
