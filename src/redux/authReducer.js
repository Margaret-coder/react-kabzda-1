import { authAPI } from "../api/authAPI"
import {stopSubmit} from "redux-form" 

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA'
const SET_ERROR_MESSAGE = 'social-network/auth/SET_ERROR_MESSAGE'

let initialState = {
    userId: null,
    email: null,
    login: null,
    avaPath: null,
    isAuth: false,
    error_message: ""
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USER_DATA:{
            return {...state, ...action.data}
        }
        case SET_ERROR_MESSAGE:{
            let newState = { 
                ...state, 
                error_message: action.error_message
            }
            console.log(newState)
            return newState
        }
        default: 
        return state
    }
}

export const loginUser = (email, password, rememberMe = false) => 
async (dispatch) => {
    try{
        let response = await authAPI.login(email, password, rememberMe)
        console.log('loginUser::::', response.data)
        if(response.status === 200){
            dispatch(getAuthUserData())
        } else {
            let message = 'Zaglushko error strashne'
            dispatch(stopSubmit('login', {_error: message}))
        }
    }
    catch (e) {
        if (e.response && e.response.data) {
          console.log(e.response.data.message)
          dispatch(setErrorMessage(e.response.data.message))
        }
    }
}

export const logoutUser = () => async (dispatch) => {
    let response = await authAPI.logout()
        if(response.status === 200){
            dispatch(setAuthUserData(null, null, false))
        }
}

export const registrationUser = (email, password) =>
async (dispatch) => {
    let response = await authAPI.register(email, password)
    if(response.status === 200){
        dispatch(setAuthUserData(response.data._id, response.data.email, true))
    } else {
        dispatch(stopSubmit('registration', {_error: 'Error'}))
    }
}

export const setErrorMessage = (text) => ({
    type: SET_ERROR_MESSAGE,
    error_message: text
})

export const setAuthUserData = (userId, email, login, avaPath, isAuth, error_message) => 
({type: SET_USER_DATA, data:{userId, email, login, avaPath, isAuth, error_message}})

export const getAuthUserData = () => async (dispatch) => {
    console.log('GetAuthUserData----')
    let response = await authAPI.me()
    if(response.data&&response.status === 200){
        console.log('response.data', response.data)
            let{id, email, login, avaPath} = response.data
            dispatch(setAuthUserData(id, email, login, avaPath, true, ""))
            return(id)
    }
    else {
        console.log('No userID response:', response)
        //dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer


// export const loginUser = (email, password, rememberMe) => 
// async (dispatch) => {
//     let response = await authAPI.login(email, password, rememberMe)
    // if(response.data.resultCode === 0){
    //     dispatch(getAuthUserData())
    // } else {
    //     let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Zaglushko error strashne'
    //     dispatch(stopSubmit('login', {_error: message}))
    // }
// }

// export const setAuthUserData = (userId, login, email, isAuth) => 
// ({type: SET_USER_DATA, data:{userId, login, email, isAuth}})

// export const getAuthUserData = () => async (dispatch) => {
//     console.log("GET AUTH USER DATA")
//     let response = await authAPI.me()
//     console.log('getAuthUserData response', response)
//         if(response&&response.data.resultCode === 0){
//             let{id, login, email} = response.data.data
//             dispatch(setAuthUserData(id, email, login, true))
//         }
// }
