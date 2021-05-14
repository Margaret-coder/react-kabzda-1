import { profileAPI} from "../api/api"

const ADD_POST = 'social-network/profile/ADD-POST'
const SET_USER_PROFILE = 'social-network/profile/SET_USER_PROFILE'
const SET_STATUS = 'social-network/profile/SET_STATUS'
const DELETE_POST = 'social-network/profile/DELETE_POST'
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
        stateCopy.postsData = Array.from(state.postsData)
        const newPost = { id: 11, message: action.text, likesCount: 0 }
        stateCopy.postsData.push(newPost)
        stateCopy.newPostText = ''
        return stateCopy
        // return {
        //   ...state, 
        //   postsData: { ...state.postsData, newPost},
        //   newPostText: ''
        // }
      }
      case SET_USER_PROFILE: {
        return {...state, profile: action.profile}
      }
      case DELETE_POST: {
        let stateCopy = {...state}
        stateCopy.postsData.splice(action.id, 1)
        return stateCopy
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

export const addPostActionCreator = (newPostText) => ({
    type: ADD_POST,
    text: newPostText
})

export const deletePostActionCreator = (id) => ({
    type: DELETE_POST,
    id
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
  dispatch (setPostsData(response))
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