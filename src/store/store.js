import { configureStore } from '@reduxjs/toolkit'
import tweetReducer from './tweetSlice.js'
import userReducer from './userSlice.js'

export const store = configureStore({
    reducer: {
        tweet: tweetReducer,
        user: userReducer
    },
})