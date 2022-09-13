import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4444/'
})

instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')

    return config
})

export const postsAPI = {
    getPosts: () => {
        return instance.get('posts')
    },
    getTags: () => {
        return instance.get('tags')
    },
    getPostsId: (id) => {
        return instance.get(`posts/${id}`)
    },
    formDataPost: (formData) => {
        return instance.post('upload', formData)
    },
    createPost: (fields) => {
        return instance.post('posts', fields)
    },
    updatePost: (id, fields) => {
        return instance.patch(`posts/${id}`, fields)
    },
    deletePost: (id) => {
        return instance.delete(`posts/${id}`)
    }
}

export const authAPI = {
    login: (params) => {
        return instance.post('auth/login', params)
    },
    register: (params) => {
        return instance.post('auth/register', params)
    },
    me: () => {
        return instance.get('auth/me')
    },
}
