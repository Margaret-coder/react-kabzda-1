import * as axios from 'axios'
import { follow } from '../redux/usersReducer'


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
         // {"API-KEY": ""}
    }
})

export const userAPI = {getUsers(currentPage = 1, pageSize = 10){
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
    getAuthMe(currentPage = 1, pageSize = 10){
        return instance.get(
            'auth/me')
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


export const getUserProfile = (userId) => {
    return instance.get(
    `profile/${userId}`)
    .then(response => {
        return response.data
    })
}