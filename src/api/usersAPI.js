import * as axios from 'axios'
import { follow } from '../redux/usersReducer'

const URL_str = 'http://localhost:5500/api/'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
         "API-KEY": "4d2b6a2a-3174-4cd7-9821-448af9ec5222"
    }
})

const my_instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5500/api/'
  })

export const usersAPI = {
    requestUsers(currentPage = 1, pageSize = 10){
            return my_instance.get('/profiles')
        },
    // requestUsers(currentPage = 1, pageSize = 10){
    //     return my_instance.get('/users')
    // },
    // requestUsers(currentPage = 1, pageSize = 10){
    //     return instance.get(
    //         `users?page=${currentPage}&count=${pageSize}`)
    //         .then(response => {
    //         return response.data 
    //     })
    // },
    follow(userId){
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId){
        return instance.delete(`follow/${userId}`)
    }
}

