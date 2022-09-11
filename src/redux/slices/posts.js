import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {postsAPI} from "../../api/postsAPI";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const res = await postsAPI.getPosts()
    return res.data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const res = await postsAPI.getTags()
    return res.data
})

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    }
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.posts.items = []
                state.posts.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.posts.items = action.payload
                state.posts.status = 'loaded'
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.posts.items = []
                state.posts.status = 'error'
            })
            .addCase(fetchTags.pending, (state, action) => {
                state.tags.items = []
                state.tags.status = 'loading'
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.tags.items = action.payload
                state.tags.status = 'loaded'
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.tags.items = []
                state.tags.status = 'error'
            })

    }
})

export const postsReducer = postsSlice.reducer