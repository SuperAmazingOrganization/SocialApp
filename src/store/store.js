import { configureStore } from '@reduxjs/toolkit'
import tweetReducer from './tweetSlice.js'

export const store = configureStore({
    reducer: {
        tweet: tweetReducer,
    },
})