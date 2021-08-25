import { postsAPI} from "../api/postsAPI"

const ADD_POST = 'social-network/profile/ADD-POST'
const DELETE_POST = 'social-network/profile/DELETE_POST'
const UPDATE_POST = 'social-network/profile/UPDATE_POST'
const SET_POSTS = 'social-network/profile/SET_POSTS'
const LIKE_POST = 'social-network/profile/LIKE_POST'

let initialState = {
  postsData : [],
}

const profileReducer = (state = initialState, action) => {
    switch (action.type){
      case ADD_POST: {
        let stateCopy = {...state}
        stateCopy.postsData.push(action.content)
        return stateCopy
      }
      case LIKE_POST: {
        let stateCopy = {...state}
        var index = stateCopy.postsData.findIndex(item => item._id === action.element._id)
        if(index !== -1){
          stateCopy.postsData.splice(index, 1, action.element)
        }
        return stateCopy
      }
      case DELETE_POST: {
        return {...state, 
          postsData: state.postsData.filter
          (item => item._id !== action.element._id)}
      }
      case UPDATE_POST: {
        return state // post value is already in state inside class jsx
      }
      case SET_POSTS: {
        return {...state, postsData: action.posts}
      }
      default: {
        return state
      }
    }
  }

export const addPostActionCreator = (newPost) => ({
    type: ADD_POST,
    content: newPost
})

export const deletePostActionCreator = (element) => ({
    type: DELETE_POST,
    element
})

export const updatePostActionCreator = (element) => ({
  type: UPDATE_POST,
  element
})

export const likePostActionCreator = (post_data) => ({
  type: LIKE_POST,
  element: post_data
})

export const setPostsData = (posts) => ({
    type: SET_POSTS,
    posts: posts
})

export const getProfilePosts = () => async (dispatch) => {
  const response = await postsAPI.requestPosts()
  dispatch(setPostsData(response))
}

export const deletePost = (id) => async (dispatch) => {
  const response = await postsAPI.deletePost(id)
  dispatch(deletePostActionCreator(response.data))
}

export const editPost = (post) => async (dispatch) => {
  const response = await postsAPI.editPost(post)
  dispatch(updatePostActionCreator(response.data)) // updatePostActionCreator is not needed 
}

export const likePost = (post_id, user_id) => async (dispatch) => {
  const response = await postsAPI.likePost(post_id, user_id)
  dispatch(likePostActionCreator(response.data))
}

export const sendNewPost = (message = "message") => async (dispatch) => {
  const response = await postsAPI.sendNewPost(message)
  dispatch(addPostActionCreator(response.data))
}

export default profileReducer