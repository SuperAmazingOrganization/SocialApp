import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tweets: [],
    isModalOpen: false,
    page: 0,
    hasMore: true,
    isLoading: false,
}

export const tweetSlice = createSlice({
    name: 'tweet',
    initialState,
    reducers: {
        loadAll: (state, action) => {
            state.tweets = action.payload
            state.page = 0
            state.hasMore = true
            state.isLoading = false
        },
        loadMore: (state, action) => {
            state.tweets = [...state.tweets, ...action.payload]
            state.page += 1
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setHasMore: (state, action) => {
            state.hasMore = action.payload
        },
        openModal: (state) => {
            state.isModalOpen = true
        },
        closeModal: (state) => {
            state.isModalOpen = false
        },
        likeTweet: (state, action) => {
            const tweet = state.tweets.find(t => t.id === action.payload.id)
            if (tweet) {
                tweet.likes = tweet.likes || []
                // action.payload.user is a UserDTO
                tweet.likes.push(action.payload.user)
            }
        },
        unlikeTweet: (state, action) => {
            const tweet = state.tweets.find(t => t.id === action.payload.id)
            if (tweet) {
                tweet.likes = tweet.likes || []
                // unlike uses userId as likedId
                tweet.likes = tweet.likes.filter(like => like.id !== action.payload.userId)
            }
        },
        commentTweet: (state, action) => {
            const tweet = state.tweets.find(t => t.id === action.payload.id)
            if (tweet) {
                tweet.comments = tweet.comments || []
                tweet.comments.push(action.payload.comment)
            }
        },
        setComments: (state, action) => {
            const tweet = state.tweets.find(t => t.id === action.payload.id)
            if (tweet) {
                tweet.comments = action.payload.comments
            }
        },
        addTweet: (state, action) => {
            state.tweets.unshift(action.payload)
        },
    },
})

export const {
    loadAll,
    loadMore,
    setLoading,
    openModal,
    closeModal,
    setHasMore,
    likeTweet,
    unlikeTweet,
    commentTweet,
    setComments,
    addTweet,
} = tweetSlice.actions

export default tweetSlice.reducer
