import { authAPI} from "../api/authAPI"
import { profileAPI} from "../api/profileAPI"

const SET_USER_PROFILE = 'social-network/profile/SET_USER_PROFILE'
const SET_STATUS = 'social-network/profile/SET_STATUS'

let initialState = {
  profile: null,
}

const profileReducer = (state = initialState, action) => {
  switch (action.type){
    case SET_USER_PROFILE: {
      let newState = {...state, profile: action.profile}
      console.log('SET_USER_PROFILE', newState)
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

// export const getUserProfile = async(userId) => {
//   console.log('GET USER PROFILE userId', userId)
//     const response = await profileAPI.getProfile(userId)
//     console.log('RESPONSE', response)
// }

export const getUserProfile = (userId) => async (dispatch) => {
  console.log('!!!!!GET USER PROFILE userId<<<<<', userId)
  const response = await profileAPI.getProfile(userId)
  if(response.status === 200){
    console.log('dispatch should be "dispatch":::', dispatch)
    dispatch(setUserProfile(response.data))
    console.log('getUserProfile response.data', response.data)
    return response.data
  }
}

export const createNewProfile = () => async(dispatch) => {
  const response = profileAPI.createNewProfile()
  dispatch(setUserProfile(response.data))
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