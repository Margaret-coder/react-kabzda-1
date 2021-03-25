import { usersAPI } from "../api/api"

const SET_USER_DATA = 'SET_USER_DATA'

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    debugger 
    switch(action){
        case SET_USER_DATA:
        return {
            ...state, 
            ...action.data,
            isAuth: true
        }
        default: return state
    }
}

export const getAuthMeThunkCreator = () => {
    debugger
    return (dispatch) => {
    debugger
        usersAPI.getAuthMe()
        .then(data => {
            if(data.resultCode === 0){
                let{id, email, login } = data.data
                debugger
                dispatch(setAuthUserData(id, email, login))
            }
        })
    }
}

export const setAuthUserData = (userId, email, login) => ({type: SET_USER_DATA, data:{userId, email, login}})
export default authReducer