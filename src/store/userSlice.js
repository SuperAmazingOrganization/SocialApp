import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    usersCache: {},
    following: [],
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setTokens: (state, action) => {
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        cacheUser: (state, action) => {
            const user = action.payload
            if (user && user.id) {
                state.usersCache[user.id] = user
            }
        },
        cacheUsers: (state, action) => {
            const users = action.payload
            if (Array.isArray(users)) {
                users.forEach(user => {
                    if (user && user.id) {
                        state.usersCache[user.id] = user
                    }
                })
            }
        },
        setFollowing: (state, action) => {
            state.following = action.payload
        },
        addFollowing: (state, action) => {
            if (!state.following.includes(action.payload)) {
                state.following.push(action.payload)
            }
        },
        removeFollowing: (state, action) => {
            state.following = state.following.filter(id => id !== action.payload)
        },
        clearUser: (state) => {
            state.currentUser = null
            state.usersCache = {}
            state.following = []
            state.accessToken = ''
            state.refreshToken = ''
        },
    },
})

export const {
    setTokens,
    setCurrentUser,
    cacheUser,
    cacheUsers,
    setFollowing,
    addFollowing,
    removeFollowing,
    clearUser,
} = userSlice.actions

export default userSlice.reducer
