import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:4444/'
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
}

export const authAPI = {
    login: (params) => {
        return instance.post('/auth/login', params)
    }
}