import { profileAPI} from "../api/api"

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'

let initialState = {postsData : [
  { id: 1, message: "Hello", likesCount: 12 },
  { id: 2, message: "Yo", likesCount: 24 },
  { id: 3, message: "Again", likesCount: 2 },
  // { id: 4, message: "But wait", likesCount: 0 },
  // { id: 5, message: "Bye", likesCount: 18 },
  // { id: 6, message: "But wtrtrtrtrait", likesCount: 3 },
  // { id: 7, message: "Bili Bili Bili bli", likesCount: 2 },
  // { id: 8, message: "Pokurit ne naydetsa", likesCount: 4 },
  // { id: 9, message: "It's my life, now and ever", likesCount: 8 },
  // { id: 10, message: "Hello", likesCount: 1 },
],
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

export const getUserProfile = (userId) => (dispatch) => {
  profileAPI.getProfile(userId).then(response => {
    dispatch(setUserProfile(response.data))
  })
}
export const getStatus = (userId) => (dispatch) => {
  profileAPI.getStatus(userId)
    .then(response => {
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


export default profileReducer