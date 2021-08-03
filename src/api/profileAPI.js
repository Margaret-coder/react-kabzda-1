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

export const profileAPI = {
    getProfile(userId){
        return my_instance.get(`profile/` + userId)
    },
    setProfile(avaPath, status, aboutMe, contacts, lookingForJob, LFJobDescription, fullname){
        return my_instance.post(`profile/` + {avaPath, status, aboutMe, 
            contacts, lookingForJob, LFJobDescription, fullname})
    },
    getStatus(userId){
        return my_instance.get(`profile/status/` + userId)
    }, 
    updateStatus(status){
        console.log('API.js Update status')
        return my_instance.patch(`profile/status/`, {status: status})
    },
    editInfo(aboutMe, contacts, lookingForJob, jobDescription){
        return my_instance.post(`/profile/edit_info`, {aboutMe, contacts, lookingForJob, jobDescription})
    },
    deletePost(post_id){
        const url = URL_str + '/' + post_id
        return axios.delete(url)
    },
    editPost(post){
        const url = URL_str + '/' + post._id
        return axios.patch(url, 
            {message: post.message})
    },
    likePost(post_id, user_id ){
        const url = URL_str + '/' + post_id
        return axios.patch(url, {user_id: user_id})
    },
    requestPosts(){
        return axios.get(`${URL_str}posts/`, 
        {crossdomain: true}).then(response => {
            return response.data
        })
    },
    sendNewPost(message){
        return axios.post(`${URL_str}posts/`, {message})
    }
}

//export const profileAPI = {
    // getProfile(userId){
    //     return instance.get(`profile/` + userId)
    // },
    // getStatus(userId){
    //     return instance.get(`profile/status/` + userId)
    // },
    // updateStatus(status){
    //     return instance.put(`profile/status`, {status: status})
    // },