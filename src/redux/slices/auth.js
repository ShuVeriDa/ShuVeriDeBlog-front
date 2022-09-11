import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI,} from "../../api/postsAPI";

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const res = await authAPI.login(params)
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
            .addCase(fetchAuth.pending, (state, action) => {
                state.status = 'loading'
                state.data = null
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.status = 'loaded'
                state.data = action.payload
            })
            .addCase(fetchAuth.rejected, (state, action) => {
                state.status = 'error'
                state.data = null
            })
    }
})

export const selectIsAuth = state => state.auth.data
// export const selectIsAuth = state => Boolean(state.auth.data)

export const authReducer = authSlice.reducer
export const {logout} = authSlice.actions
