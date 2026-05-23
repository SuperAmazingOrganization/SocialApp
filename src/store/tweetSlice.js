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
                tweet.likes.push(action.payload.like)
            }
        },
        unlikeTweet: (state, action) => {
            const tweet = state.tweets.find(t => t.id === action.payload.id)
            if (tweet) {
                tweet.likes = tweet.likes || []
                tweet.likes = tweet.likes.filter(like => like.id !== action.payload.likeId)
            }
        },
        commentTweet: (state, action) => {
            const tweet = state.tweets.find(t => t.id === action.payload.id)
            if (tweet) {
                tweet.comments = tweet.comments || []
                tweet.comments.push(action.payload.comment)
            }
        }
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
} = tweetSlice.actions

export default tweetSlice.reducer
