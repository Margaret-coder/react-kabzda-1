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

export const postsAPI = {
    /* POSTS */
    deletePost(post_id){
        return my_instance.delete(`/posts/${post_id}`)
    },
    editPost(post){
        return my_instance.patch(`/posts/${post._id}`, 
            {message: post.message})
    },
    likePost(post_id){
        return my_instance.patch(`/posts/${post_id}`)
    },
    requestPosts(){
        return my_instance.get(`posts/`, 
        {crossdomain: true}).then(response => {
            return response.data
        })
    },
    requestPostsByUserId(user_id){
        return my_instance.get(`posts/${user_id}`, 
        {crossdomain: true}).then(response => {
            return response.data
        })
    },
    sendNewPost(message, userId){
        return my_instance.post(`posts/`, {message, userId})
    }
}