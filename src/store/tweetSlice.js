import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tweets: [],
}

export const tweetSlice = createSlice({
    name: 'tweet',
    initialState,
    reducers: {
        loadAll: (state, action) => {
            state.tweets = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const { loadAll } = tweetSlice.actions

export default tweetSlice.reducer