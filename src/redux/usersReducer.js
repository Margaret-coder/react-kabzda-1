import { usersAPI } from "../api/api"

let FOLLOW = 'FOLLOW'
let UNFOLLOW = 'UNFOLLOW'
let SET_USERS = 'SET_USERS'
let SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
let SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
let TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
let TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
     users: [
    // {id: 1, 
    //     profilePhoto: 'https://images.pexels.com/photos/157920/woman-face-curly-hair-157920.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    //     fullName: 'Girlu', status: 'Menya trudno nayti, legko poteryat` i nevoszmojno zabit`', followed: false, location: {city: 'NY', country: 'US'}
    // },
    // {id: 2, 
    //     profilePhoto: 'https://images.pexels.com/photos/750565/pexels-photo-750565.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 
    //     fullName: 'Iggy Pops', status: 'Bamballeyo', followed: true, location: {city: 'Odessa', country: 'US'}
    // },
    // {id: 3, 
    //     profilePhoto: 'https://images.pexels.com/photos/5051699/pexels-photo-5051699.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500', 
    //     fullName: 'A Horse', status: 'Igogo', followed: false, location: {city: 'Chorni', country: 'Bile'}
    // }
    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 8,
    isFetching: false,
    followingInProgress: []
}

const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case FOLLOW: {
            let stateCopy = {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
            return stateCopy
        }
        case UNFOLLOW: {
            let stateCopy = {
                ...state,
                users: state.users.map(u => {
                    if(u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
            return stateCopy
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

export const getUsers = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(toggleIsFetching(true))
        usersAPI.getUsers(currentPage, pageSize)
        .then(data => {
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(data.items))
                dispatch(setTotalUsersCount(data.totalCount))
            })
        }
}

export const follow = (userId) => {
    return (dispatch) => {
        dispatch (toggleFollowingProgress(true, userId))
            usersAPI.follow(userId)
            .then(response => {
                if(response.data.resultCode === 0)
                {
                    dispatch (followSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            })
    }
}
export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch (toggleFollowingProgress(true, userId))
            usersAPI.unfollow(userId)
            .then(response => {
                if(response.data.resultCode === 0)
                {
                    dispatch (unfollowSuccess(userId))
                }
                dispatch(toggleFollowingProgress(false, userId))
            })
    }
}

export default usersReducer