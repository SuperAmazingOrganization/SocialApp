import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: '',
    accessToken: '',
    refreshToken: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        },
    },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
