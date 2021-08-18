import { usersAPI } from "../api/usersAPI"
import { updateObjectInArray } from "../utils/object-helpers"

let FOLLOW = 'social-network/users/FOLLOW'
let UNFOLLOW = 'social-network/users/UNFOLLOW'
let SET_USERS = 'social-network/useers/SET_USERS'
let SET_CURRENT_PAGE = 'social-network/users/SET_CURRENT_PAGE'
let SET_TOTAL_USERS_COUNT = 'social-network/users/SET_TOTAL_USERS_COUNT'
let TOGGLE_IS_FETCHING = 'social-network/users/TOGGLE_IS_FETCHING'
let TOGGLE_IS_FOLLOWING_PROGRESS = 'social-network/users/TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
    users: [],
    pageSize: 5,
    paginatorPortionSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case FOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: updateObjectInArray
                (state.users, action.userId, "id", {followed: false}) 
            }
        }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state, 
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : [state.followingInProgress
                    .filter(id => id !== action.userId)]
            }
        }
        default: return state
    }
}

export const followSuccess = (userId) => ({type: FOLLOW, userId})
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount})
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})

/* Samurai method */
// export const requestUsers = (currentPage, pageSize) => {
//     return async (dispatch) => {
//         dispatch(toggleIsFetching(true))
//         const response = await usersAPI.requestUsers(currentPage, pageSize)
//             dispatch(toggleIsFetching(false))
//             dispatch(setUsers(response.items))
//             dispatch(setTotalUsersCount(response.totalCount))
//             dispatch(setCurrentPage(currentPage))
//         }
// }

export const requestUsers = (currentPage, pageSize) => {
    console.log("requestUsers")
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        const response = await usersAPI.requestUsers(currentPage, pageSize)
        console.log("response Users", response)
        if(response.status === 200){
            dispatch(toggleIsFetching(false))
            console.log("OK dispatch")
            dispatch(setUsers(response.data))

            // dispatch(setTotalUsersCount(response.totalCount))
            // dispatch(setCurrentPage(currentPage))
        }
    }
}

export const followUnfollowFlow = async (dispatch, userId, apiRequest, actionCreator) => {
    dispatch (toggleFollowingProgress(true, userId))
    const response = await apiRequest(userId)
    if(response.data.resultCode === 0)
    {
        dispatch (actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId) => {
    return async(dispatch) => {
        const apiRequest = usersAPI.follow
        const actionCreator = followSuccess
        followUnfollowFlow(dispatch, userId, apiRequest, actionCreator)
    }
}
export const unfollow = (userId) => {
    return async (dispatch) => {
        const apiRequest = usersAPI.unfollow
        const actionCreator = unfollowSuccess
        followUnfollowFlow(dispatch, userId, apiRequest, actionCreator)
    }
}

export default usersReducer