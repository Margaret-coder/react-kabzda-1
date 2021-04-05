import { profileAPI, usersAPI } from "../api/api"

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_POST_TEXT ='UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'

let initialState = {postsData : [
  { id: 1, message: "Hello", likesCount: 12 },
  { id: 2, message: "Yo", likesCount: 24 },
  { id: 3, message: "Again", likesCount: 2 },
  { id: 4, message: "But wait", likesCount: 0 },
  { id: 5, message: "Bye", likesCount: 18 },
  { id: 6, message: "But wtrtrtrtrait", likesCount: 3 },
  { id: 7, message: "Bili Bili Bili bli", likesCount: 2 },
  { id: 8, message: "Pokurit ne naydetsa", likesCount: 4 },
  { id: 9, message: "It's my life, now and ever", likesCount: 8 },
  { id: 10, message: "Hello", likesCount: 1 },
],
newPostText: '',
profile: null
}

export const addPostActionCreator = () => ({
    type: ADD_POST,
    userId: 11
  })
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type){
      case ADD_POST: {
        let stateCopy = {...state}
        stateCopy.postsData = Array.from(state.postsData)
        const newPost = { id: 11, message: state.newPostText, likesCount: 0 }
        stateCopy.postsData.push(newPost)
        stateCopy.newPostText = ''
        return stateCopy
      }
      case UPDATE_NEW_POST_TEXT: {
        let stateCopy = {...state}
        stateCopy.newPostText = action.text
        return stateCopy
      }
      case SET_USER_PROFILE: {
        return {...state, profile: action.profile}
      }
      case SET_STATUS: {
        return {...state, status: action.status}
      }
      default: {
        return state
      }
    }
  }

export const getUserProfile = (userId) => (dispatch) => {
  usersAPI.getUserProfile(userId).then(response => {
    dispatch(setUserProfile(response))
  })
}
export const getStatus = (userId) => (dispatch) => {
  profileAPI.getStatus(userId)
    .then(response => {
      debugger
      dispatch(setStatus(response.data) )
    })
}
export const updateStatus = (status) => (dispatch) => {
  profileAPI.updateStatus(status)
  .then(response => {
    if(response.data.resultCode === 0){
      dispatch(setStatus(status))
    }
  })
}
export const setStatus = (text) => ({
  type: SET_STATUS,
  status: text
})

export const updatePostActionCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    text: text
  })
export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE, 
  profile: profile
})

export default profileReducer