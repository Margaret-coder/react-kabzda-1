import { getAuthUserData } from "./authReducer"


const INITIALIZATION_SUCCESS = 'social-network/app/INITIALIZATION_SUCCESS'

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {
    switch(action.type){
        case INITIALIZATION_SUCCESS:
            return {
                ...state,
                initialized: true
            }
            default:
                return state
    }
}

export const initializedSuccess = () => ({type: INITIALIZATION_SUCCESS})

export const initializeApp = () => async (dispatch) => {
        await dispatch(getAuthUserData())
        dispatch(initializedSuccess())
}

export default appReducer