import { createSlice } from '@reduxjs/toolkit'

function decodeToken(token) {
    try {
        const payload = token.split('.')[1]
        return JSON.parse(atob(payload))
    } catch {
        return null
    }
}

const initialState = {
    userId: null,
    username: '',
    accessToken: '',
    refreshToken: ''
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const decoded = decodeToken(action.payload.accessToken)
            state.userId = decoded?.sub ? Number(decoded.sub) : null
            state.username = action.payload.username || ''
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        },
        logout: () => {
            localStorage.removeItem('accessToken')
            return initialState
        },
    },
})

export const { setUser, logout } = userSlice.actions

export default userSlice.reducer
