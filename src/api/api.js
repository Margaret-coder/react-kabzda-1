import * as axios from 'axios'
import { follow } from '../redux/usersReducer'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
         "API-KEY": "4d2b6a2a-3174-4cd7-9821-448af9ec5222"
    }
})

export const usersAPI = {
    requestUsers(currentPage = 1, pageSize = 10){
        return instance.get(
            `users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
            return response.data 
        })
},
    getUserProfile(userId){
        // return instance.get(
        // `profile/${userId}`)
        // .then(response => {
        //     return response.data
        // })
        console.error('Obsolete method. Please, use profileAPI.getProfile method')
        return profileAPI.getProfile(userId)
    },
    follow(userId){
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId){
        return instance.delete(`follow/${userId}`)
    }
}
export const profileAPI = {
    getProfile(userId){
        return instance.get(`profile/` + userId)
    },
    getStatus(userId){
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status){
        return instance.put(`profile/status`, {status: status})
    },
    requestPosts(){
        return axios.get("http://localhost:5500/api/posts/", 
        {crossdomain: true}).then(response => {
            return response.data
        })
    }
}
export const authAPI = {
    me(){
        return instance.get('auth/me')
    },
    login(email, password, rememberMe = false){
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout(){
        return instance.delete(`auth/login`)
    }
}

export const getUserProfile = (userId) => {
    return instance.get(
    `profile/${userId}`)
    .then(response => {
        return response.data
    })
}