import { profileAPI} from "../api/api"

const ADD_POST = 'social-network/profile/ADD-POST'
const SET_USER_PROFILE = 'social-network/profile/SET_USER_PROFILE'
const SET_STATUS = 'social-network/profile/SET_STATUS'
const DELETE_POST = 'social-network/profile/DELETE_POST'
const EDIT_POST = 'social-network/profile/EDIT_POST'
const SET_POSTS = 'social-network/profile/SET_POSTS'

let initialState = {
  postsData : [],
  //newPostText: '',
  profile: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type){
      case ADD_POST: {
        let stateCopy = {...state}
        stateCopy.postsData.push(action.content)
        return stateCopy
      }
      case SET_USER_PROFILE: {
        return {...state, profile: action.profile}
      }
      case DELETE_POST: {
        return {...state, 
          postsData: state.postsData.filter
          (item => item._id !== action.element._id)}
      }
      case EDIT_POST: {
        return {...state, postsData: state.postsData.filter(item => item._id === action.element._id ?
          item = action.element : item)}
      }
      case SET_STATUS: {
        return {...state, status: action.status}
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

export const editPostActionCreator = (element) => ({
  type: EDIT_POST,
  element
})

export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE, 
    profile: profile
})

export const setStatus = (text) => ({
    type: SET_STATUS,
    status: text
})

export const setPostsData = (posts) => ({
    type: SET_POSTS,
    posts: posts

})

export const getProfilePosts = () => async (dispatch) => {
  const response = await profileAPI.requestPosts()
  dispatch(setPostsData(response))
}

export const deletePost = (id) => async (dispatch) => {
  const response = await profileAPI.deletePost(id)
  dispatch(deletePostActionCreator(response.data))
}

export const editPost = (post) => async (dispatch) => {
  const response = await profileAPI.editPost(post)
  dispatch(editPostActionCreator(response.data))
}

export const sendNewPost = (message = "message") => async (dispatch) => {
  const response = await profileAPI.sendNewPost(message)
  dispatch(addPostActionCreator(response.data))
}

export const getUserProfile = (userId) => async (dispatch) => {
  const response = await profileAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
}
export const getStatus = (userId) => async (dispatch) => {
  const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data) )
}
export const updateStatus = (status) => async (dispatch) => {
  const response = await profileAPI.updateStatus(status)
    if(response.data.resultCode === 0){
      dispatch(setStatus(status))
    }
}

export default profileReducer