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
    baseURL: 'http://localhost:5500/api/profile/'
  })

export const profileAPI = {
    /* PROFILE */
    getProfileByUserId(userId){
        // console.log('-userId-getProfileByUserId', userId)
        return my_instance.get(userId)
    },
    createNewProfile(){
        return my_instance.post()
    },
    /* STATUS */
    getStatus(userId){
        return my_instance.get(`status/` + userId)
    }, 
    updateStatus(status){
        return my_instance.patch(`status/`, {status: status})
    },
    /* INFO */
    editInfo(formData){
        return my_instance.post(`edit_profile/`, formData)
    }
}    

/* samurai */
//export const profileAPI = {
    // getProfile(userId){
    //     return instance.get(`profile/` + userId)
    // },
    // getStatus(userId){
    //     return instance.get(`profile/status/` + userId)
    // },
    // updateStatus(status){
    //     return instance.put(`profile/status`, {status: status})
    // }