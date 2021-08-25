import * as axios from 'axios'

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


export const authAPI = {
    me(){
        console.log('Auth me')
        return my_instance.get(`/me`) 
    },
    login(email, password, rememberMe = false){
       return my_instance.post(`/login`, {email, password, rememberMe}) 
     },
    logout(){
        return my_instance.delete(`/login`)
    },
    // logout(){
    //     console.log('api.js logout')
    //     return my_instance.get(`/logout`)
    // },
    register(username, email, password){
        console.log("authAPI register `users/`")
        return my_instance.post(`users/`, {username, email, password})
    }
}

//export const authAPI = {
    // me(){ // samurai server requests
    //     return instance.get('auth/me')
    // },
    // login(email, password, rememberMe = false){
    //     return instance.post(`auth/login`, 
    //     {email, password, rememberMe})
    //  },
    //  logout(){
    //      return instance.delete(`auth/login`)
    //  },