import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI,} from "../../api/postsAPI";

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params) => {
    const res = await authAPI.login(params)
    return res.data
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const res = await authAPI.register(params)
    return res.data
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const res = await authAPI.me()
    return res.data
})

const initialState = {
    data: null,
    status: 'loading',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
            state.status = 'loaded'
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchLogin.pending, (state, action) => {
                state.status = 'loading'
                state.data = null
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.status = 'loaded'
                state.data = action.payload
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.status = 'error'
                state.data = null
            })
            .addCase(fetchAuthMe.pending, (state, action) => {
                state.status = 'loading'
                state.data = null
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.status = 'loaded'
                state.data = action.payload
            })
            .addCase(fetchAuthMe.rejected, (state, action) => {
                state.status = 'error'
                state.data = null
            })
            .addCase(fetchRegister.pending, (state, action) => {
                state.status = 'loading'
                state.data = null
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = 'loaded'
                state.data = action.payload
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.status = 'error'
                state.data = null
            })
    }
})

export const selectIsAuth = state => state.auth.data
// export const selectIsAuth = state => Boolean(state.auth.data)

export const authReducer = authSlice.reducer
export const {logout} = authSlice.actions
