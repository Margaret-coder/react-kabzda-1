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
    /* PROFILE */
    getProfile(userId){
        return my_instance.get(`profile/` + userId)
    },
    setProfile(avaPath, status, aboutMe, contacts, 
        lookingForJob, LFJobDescription, fullname, imageFormData){
        return my_instance.post(`profile/` + {avaPath, status, aboutMe, 
            contacts, lookingForJob, LFJobDescription, fullname, imageFormData})
    },
    createProfile(status, aboutMe, contacts, lookingForJob, jobDescription, fullname, 
        imageFormData){
        console.log('imageFormData', imageFormData)
       return my_instance.post(`/profile/create_profile`, 
        // return my_instance.post(`/profile/image`, 
        imageFormData)
    },
    /* IMAGE */
    setImage(formData){
       my_instance.post(`${URL_str}profile/image`, formData)
    },
    /* STATUS */
    getStatus(userId){
        return my_instance.get(`profile/status/` + userId)
    }, 
    updateStatus(status){
        return my_instance.patch(`profile/status/`, {status: status})
    },
    /* INFO */
    editInfo(formData){
        return my_instance.post(`/profile/edit_profile`, formData)
    },
    /* POSTS */
    deletePost(post_id){
        const url = URL_str + '/posts/' + post_id
        return axios.delete(url)
    },
    editPost(post){
        const url = URL_str + '/posts/' + post._id
        return axios.patch(url, 
            {message: post.message})
    },
    likePost(post_id, user_id ){
        const url = URL_str + '/posts/' + post_id
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