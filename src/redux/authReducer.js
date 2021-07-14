import { authAPI } from "../api/api"
import {stopSubmit} from "redux-form" 

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA'

let initialState = {
    userId: null,
 //   email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USER_DATA:{
            let newState = { 
                ...state, 
                ...action.data
            }
             return newState
        }
        default: 
        return state
    }
}

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

export const loginUser = (email, password, rememberMe = false) => 
async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe)
    if(response.status === 200){
        dispatch(getAuthUserData())
    } else {
        let message = 'Zaglushko error strashne'
        dispatch(stopSubmit('login', {_error: message}))
    }
}

export const registrationUser = (login, email, password) =>
async (dispatch) => {
    let response = await authAPI.register(login, email, password)
    if(response.status === 200){
        dispatch(setAuthUserData(response.data._id, response.data.username, response.data.email, true))
    } else {
        dispatch(stopSubmit('registration', {_error: 'Error'}))
    }
}

export const logoutUser = () => async (dispatch) => {
    let response = await authAPI.logout()
        if(response.data.resultCode === 0){
            dispatch(setAuthUserData(null, null, false))
        }
}

export const setAuthUserData = (userId, login, isAuth) => 
({type: SET_USER_DATA, data:{userId, login, isAuth}})

// export const setAuthUserData = (userId, login, email, isAuth) => 
// ({type: SET_USER_DATA, data:{userId, login, email, isAuth}})

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me()
    if(response.data&&response.status === 200){
            let{id, username} = response.data
            dispatch(setAuthUserData(id, username, true))
    }
    else {
        dispatch(setAuthUserData(null, null, false))
    }
}

// export const getAuthUserData = () => async (dispatch) => {
//     console.log("GET AUTH USER DATA")
//     let response = await authAPI.me()
//     console.log('getAuthUserData response', response)
//         if(response&&response.data.resultCode === 0){
//             let{id, login, email} = response.data.data
//             dispatch(setAuthUserData(id, email, login, true))
//         }
// }

export default authReducer