

export async function getAllPosts() {
    const response = await fetch('http://localhost:8080/api/v1/posts')
    const posts = await response.json()
    return posts
}
