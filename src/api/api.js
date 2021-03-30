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
    getUsers(currentPage = 1, pageSize = 10){
        return instance.get(
            `users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
            return response.data 
        })
},
    getUserProfile(userId){
        return instance.get(
        `profile/${userId}`)
        .then(response => {
            return response.data
        })
    },
    follow(userId){
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId){
        return instance.delete(`follow/${userId}`)
    }
}
export const authAPI = {
    me(){
        return instance.get('auth/me')
    }
}

export const getUserProfile = (userId) => {
    return instance.get(
    `profile/${userId}`)
    .then(response => {
        return response.data
    })
}