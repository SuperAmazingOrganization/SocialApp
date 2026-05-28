const BASE_URL = 'http://localhost:8080/api/v1';

function authHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    };
}

// Auth
export async function getToken(identifier, password) {
    const response = await fetch(`${BASE_URL}/tokens`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
    });
    if (!response.ok) throw new Error('Login failed');
    return await response.json();
}

export async function getCurrentUser() {
    const response = await fetch(`${BASE_URL}/tokens/me`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    if (!response.ok) throw new Error('Failed to fetch current user');
    return await response.json();
}

// Users
export async function registerUser({ email, username, password }) {
    const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password })
    });
    if (!response.ok) throw new Error('Registration failed');
    return await response.json();
}

export async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
}

export async function getUser(userId) {
    const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    if (!response.ok) throw new Error('Failed to fetch user');
    return await response.json();
}

export async function getUserFollowing(userId) {
    const response = await fetch(`${BASE_URL}/users/${userId}/following`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    if (!response.ok) throw new Error('Failed to fetch following');
    return await response.json();
}

export async function followUser(userId, targetUserId) {
    const response = await fetch(`${BASE_URL}/users/${userId}/following`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ userId: targetUserId })
    });
    if (!response.ok) throw new Error('Failed to follow user');
    return await response.json();
}

export async function unfollowUser(userId, targetUserId) {
    const response = await fetch(`${BASE_URL}/users/${userId}/following/${targetUserId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    if (!response.ok) throw new Error('Failed to unfollow user');
}

// Posts
export async function createPost(post) {
    const response = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(post)
    });
    if (!response.ok) throw new Error('Failed to create post');
    return await response.json();
}

export async function getAllPosts(page, size) {
    const response = await fetch(`${BASE_URL}/posts?page=${page}&size=${size}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    if (!response.ok) throw new Error('Failed to fetch posts');
    return await response.json();
}

// Likes
export async function likePost(postId, userId) {
    const response = await fetch(`${BASE_URL}/posts/${postId}/likes`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ userId })
    });
    if (!response.ok) throw new Error('Failed to like post');
    return await response.json();
}

export async function unlikePost(postId, likedId) {
    const response = await fetch(`${BASE_URL}/posts/${postId}/likes/${likedId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    if (!response.ok) throw new Error('Failed to unlike post');
}

export async function getPostLikes(postId) {
    const response = await fetch(`${BASE_URL}/posts/${postId}/likes`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    if (!response.ok) throw new Error('Failed to fetch likes');
    return await response.json();
}

// Comments
export async function getPostComments(postId) {
    const response = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
    });
    if (!response.ok) throw new Error('Failed to fetch comments');
    return await response.json();
}

export async function commentPost(postId, authorId, body) {
    const response = await fetch(`${BASE_URL}/posts/${postId}/comments`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ authorId, body })
    });
    if (!response.ok) throw new Error('Failed to comment');
    return await response.json();
}
