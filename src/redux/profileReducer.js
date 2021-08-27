import { profileAPI} from "../api/profileAPI"

const SET_USER_PROFILE = 'social-network/profile/SET_USER_PROFILE'
const SET_STATUS = 'social-network/profile/SET_STATUS'

let initialState = {
  profile: null,
}

const profileReducer = (state = initialState, action) => {
  switch (action.type){
    case SET_USER_PROFILE: {
      console.log('SET_USER_PROFILE')
        let newState = {...state, profile: action.profile}
        return newState
      }
      case SET_STATUS: {
        return {...state, status: action.status}
      }
      default: {
        return state
    }
  }
}

export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE, 
    profile: profile
})

export const setStatus = (text) => ({
    type: SET_STATUS,
    status: text
})

export const getAuthProfile = () => async (dispatch) => {
  const response = await profileAPI.getAuthProfile()
  if(response.status === 200){
    dispatch(setUserProfile(response.data))
  }
}

export const getUserProfile = (userId) => async (dispatch) => {
  console.log('getUserProfile')
  const response = await profileAPI.getProfile(userId)
  if(response.status === 200){
    dispatch(setUserProfile(response.data))
  }
}

export const editProfileInfo = (formData) => async(dispatch) => {
  const response = await profileAPI.editInfo(formData)
  dispatch(setUserProfile(response.data))
}

export const uploadImage = (formData) => async(dispatch) => {
  const response = await profileAPI.uploadImage(formData)
  dispatch(setUserProfile(response.data))
}

export const getStatus = (userId) => async (dispatch) => {
  //TO DO userId null
  const response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data) )
}
export const updateStatus = (status) => async (dispatch) => {
  const response = await profileAPI.updateStatus(status)
    //if(response.data.resultCode === 0){ // samurai server response
    if(response.status === 200){
      dispatch(setStatus(status))
    }
}

export default profileReducer